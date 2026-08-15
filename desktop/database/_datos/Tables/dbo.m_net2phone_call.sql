IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_net2phone_call] (
    [n2p_idkey] int NOT NULL,
    [n2p_reciid] int NOT NULL,
    [n2p_callid] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [n2p_click2call_response] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [n2p_delete_response] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [n2p_recording_response] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [n2p_recording_url] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [n2p_status] int NOT NULL,
    [n2p_dcreate] datetime CONSTRAINT [DF_m_net2phone_call_n2p_dcreate] DEFAULT (getdate()) NOT NULL,
    [n2p_recording_filename] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [n2p_dhang] datetime NOT NULL,
    CONSTRAINT [PK_m_net2phone_call] PRIMARY KEY CLUSTERED ([n2p_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [nc_n2p_rec_iid] ON [dbo].[m_net2phone_call] ([n2p_reciid] ASC);
GO
