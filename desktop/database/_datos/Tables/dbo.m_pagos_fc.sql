IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_pagos_fc] (
    [pag_iCodigo_ID] int NOT NULL,
    [pag_iCodigoCbte] int CONSTRAINT [DF_m_pagos_fc_pag_icodigocbte] DEFAULT ((0)) NOT NULL,
    [pag_iCodigoCaja] int CONSTRAINT [DF_m_pagos_fc_pag_iCodigoCaja] DEFAULT ((0)) NOT NULL,
    [pag_cFormaPago] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_pagos_fc_pag_cformapago] DEFAULT ('') NOT NULL,
    [pag_iNumero] bigint CONSTRAINT [DF_m_pagos_fc_pag_inumero] DEFAULT ((0)) NOT NULL,
    [pag_cBanco] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_pagos_fc_pag_cbanco] DEFAULT ('') NOT NULL,
    [pag_dVencimiento] datetime CONSTRAINT [DF_m_pagos_fc_pag_dvencimiento] DEFAULT (getdate()) NOT NULL,
    [pag_yImporte] money CONSTRAINT [DF_m_pagos_fc_pag_yImporte] DEFAULT ((0)) NOT NULL,
    [pag_cFirmante] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_pagos_fc_pag_cFirmante] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_pagos_fc] PRIMARY KEY CLUSTERED ([pag_iCodigo_ID] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_pagos_fc] ON [dbo].[m_pagos_fc] ([pag_iCodigoCbte] ASC);
GO
