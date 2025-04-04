import { animate, state, style, transition, trigger } from "@angular/animations";
import { ConnectedPosition } from "@angular/cdk/overlay";
import { Component } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { I18nService } from "@bitwarden/common/platform/abstractions/i18n.service";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";
import { StateService } from "@bitwarden/common/platform/abstractions/state.service";
import { Utils } from "@bitwarden/common/platform/misc/utils";

import {
  BrowserFido2UserInterfaceSession,
  fido2PopoutSessionData$,
} from "../../../fido2/browser-fido2-user-interface.service";

@Component({
  selector: "app-fido2-use-browser-link",
  templateUrl: "fido2-use-browser-link.component.html",
  animations: [
    trigger("transformPanel", [
      state(
        "void",
        style({
          opacity: 0,
        }),
      ),
      transition(
        "void => open",
        animate(
          "100ms linear",
          style({
            opacity: 1,
          }),
        ),
      ),
      transition("* => void", animate("100ms linear", style({ opacity: 0 }))),
    ]),
  ],
})
export class Fido2UseBrowserLinkComponent {
  showOverlay: boolean = false;
  isOpen = false;
  overlayPosition: ConnectedPosition[] = [
    {
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top",
      offsetY: 5,
    },
  ];

  protected fido2PopoutSessionData$ = fido2PopoutSessionData$();

  constructor(
    private stateService: StateService,
    private platformUtilsService: PlatformUtilsService,
    private i18nService: I18nService,
  ) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  /**
   * Aborts the current FIDO2 session and fallsback to the browser.
   * @param excludeDomain - Identifies if the domain should be excluded from future FIDO2 prompts.
   */
  protected async abort(excludeDomain = true) {
    this.close();
    const sessionData = await firstValueFrom(this.fido2PopoutSessionData$);

    if (!excludeDomain) {
      this.abortSession(sessionData.sessionId);
      return;
    }
    // Show overlay to prevent the user from interacting with the page.
    this.showOverlay = true;
    await this.handleDomainExclusion(sessionData.senderUrl);
    // Give the user a chance to see the toast before closing the popout.
    await Utils.delay(2000);
    this.abortSession(sessionData.sessionId);
  }

  /**
   * Excludes the domain from future FIDO2 prompts.
   * @param uri - The domain uri to exclude from future FIDO2 prompts.
   */
  private async handleDomainExclusion(uri: string) {
    const exisitingDomains = await this.stateService.getNeverDomains();

    const validDomain = Utils.getHostname(uri);
    const savedDomains: { [name: string]: unknown } = {
      ...exisitingDomains,
    };
    savedDomains[validDomain] = null;

    this.stateService.setNeverDomains(savedDomains);

    this.platformUtilsService.showToast(
      "success",
      null,
      this.i18nService.t("domainAddedToExcludedDomains", validDomain),
    );
  }

  private abortSession(sessionId: string) {
    BrowserFido2UserInterfaceSession.abortPopout(sessionId, true);
  }
}
