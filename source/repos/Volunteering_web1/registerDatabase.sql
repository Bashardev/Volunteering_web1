CREATE TABLE [dbo].[register] (
    [id]         INT          IDENTITY (1, 1) NOT NULL,
    [firstName]  VARCHAR (12) NOT NULL,
    [familyName] VARCHAR (12) NOT NULL,
    [email]      VARCHAR (20) NOT NULL,
    [password]   VARCHAR (12) NOT NULL
);

