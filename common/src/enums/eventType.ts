export enum EventType {
    User_LoggedIn = 1000,
    User_ChangedPassword = 1001,
    User_Updated2fa = 1002,
    User_Disabled2fa = 1003,
    User_Recovered2fa = 1004,
    User_FailedLogIn = 1005,
    User_FailedLogIn2fa = 1006,
    User_ClientExportedVault = 1007,

    Cipher_Created = 1100,
    Cipher_Updated = 1101,
    Cipher_Deleted = 1102,
    Cipher_AttachmentCreated = 1103,
    Cipher_AttachmentDeleted = 1104,
    Cipher_Shared = 1105,
    Cipher_UpdatedCollections = 1106,
    Cipher_ClientViewed = 1107,
    Cipher_ClientToggledPasswordVisible = 1108,
    Cipher_ClientToggledHiddenFieldVisible = 1109,
    Cipher_ClientToggledCardCodeVisible = 1110,
    Cipher_ClientCopiedPassword = 1111,
    Cipher_ClientCopiedHiddenField = 1112,
    Cipher_ClientCopiedCardCode = 1113,
    Cipher_ClientAutofilled = 1114,
    Cipher_SoftDeleted = 1115,
    Cipher_Restored = 1116,
    Cipher_ClientToggledCardNumberVisible = 1117,

    Collection_Created = 1300,
    Collection_Updated = 1301,
    Collection_Deleted = 1302,

    Group_Created = 1400,
    Group_Updated = 1401,
    Group_Deleted = 1402,

    OrganizationUser_Invited = 1500,
    OrganizationUser_Confirmed = 1501,
    OrganizationUser_Updated = 1502,
    OrganizationUser_Removed = 1503,
    OrganizationUser_UpdatedGroups = 1504,
    OrganizationUser_UnlinkedSso = 1505,
    OrganizationUser_ResetPassword_Enroll = 1506,
    OrganizationUser_ResetPassword_Withdraw = 1507,
    OrganizationUser_AdminResetPassword = 1508,

    Organization_Updated = 1600,
    Organization_PurgedVault = 1601,
    // Organization_ClientExportedVault = 1602,

    Policy_Updated = 1700,

    ProviderUser_Invited = 1800,
    ProviderUser_Confirmed = 1801,
    ProviderUser_Updated = 1802,
    ProviderUser_Removed = 1803,

    ProviderOrganization_Created = 1900,
    ProviderOrganization_Added = 1901,
    ProviderOrganization_Removed = 1902,
}
