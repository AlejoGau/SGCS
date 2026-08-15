CREATE OR ALTER PROCEDURE [dbo].[getCustomCommands]
	@page [int] = 1,
	@start [int] = 0,
	@limit [int] = 50,
	@sort [nvarchar](256) = '',
	@group [nvarchar](256) = '',
	@filter [nvarchar](2048) = '',
	@_dc [nvarchar](256) = '',
	@token [varchar](128) = '',
	@totalrows [int] = 1 OUTPUT
WITH EXECUTE AS CALLER
AS
SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cmd_iid] ASC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_comandos_ip')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..p_comandos_ip o
		Left Outer Join _Datos.dbo.m_cuentas cue WITH (NOLOCK) ON cue.cue_iid = o.cmd_idcuenta
		Inner Join _Datos.dbo.m_receptores_cab rec WITH (NOLOCK) on o.cmd_idreceptor = rec.rec_iid
		Left Join _Datos.dbo.m_cuentas_video cuv WITH (NOLOCK) on cuv_iidCuenta = cmd_idCuenta
		Left Outer Join [_Tablas].[dbo].[t_comandos] TCM WITH (NOLOCK) ON [tcm_iReceptor]=rec.rec_iid ANd  tcm_iid = cmd_iComando 
		Left Outer Join [_Tablas].[dbo].[T_ReceptorProtocolModel] RPM WITH (NOLOCK) ON [rpm_iReceptor] = rec.rec_iid And [tcm_rpmidKey]=rpm_idKey
		Left Outer Join [_Datos].[dbo].[m_paneles] PAN WITH (NOLOCK) ON [pan_iidcuenta] = cue.cue_iid
		WHERE 1 = 1 ' + @SqlFilter 

/*
 Print '------'
 Print @Sql
 Print '------'
 */

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --2020-04-17 : Pablo. Cambie el o.* por los campos de p_comandos_ip para poder hacer el Replace
 --Execute Sql (ReturnRows)
 --2025-11-07 : Pablo. Agregue calculo de URLID y AUTHKEY para Shelly

 Declare @DynamicSqlReturnRows NVARCHAR(MAX)   
 Set @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
							   [cmd_iid]
							  ,[cmd_tfechahora]
							  ,[cmd_idCuenta]
							  ,[cmd_idReceptor]
							  ,[cmd_iComando]
							  --,Case When RPM.rpm_cMarca=''Deitres'' And RPM.rpm_cModelo=''Deitres'' Then Replace(cmd_cvalores,''<<cue_ncuenta>>'',Replace(Rtrim(cue_ncuenta),''0'',''A''))  Else Replace(cmd_cvalores,''<<cue_ncuenta>>'',Rtrim(cue_ncuenta)) End as cmd_cvalores
							  ,Replace (Case When RPM.rpm_cMarca=''Deitres'' And RPM.rpm_cModelo=''Deitres'' Then Replace(cmd_cvalores,''<<cue_ncuenta>>'',Replace(Rtrim(cue_ncuenta),''0'',''A'')) Else Replace(cmd_cvalores,''<<cue_ncuenta>>'',Rtrim(cue_ncuenta)) End , ''<<cue_cImei>>'', Rtrim(cue_cImei) ) as cmd_cvalores
							  ,[cmd_nEstado]
							  ,[cmd_cObservaciones]
							  ,[cmd_iOperador]
							  ,[cmd_tEnvioFechaHora]
							  ,[cmd_iEsCustom]
							  ,[cmd_cRespuesta],
								--o.*,
								cue.*,
								--rec.*,
								Case When rec.rec_cdll=''SoftGuardSC'' Then ''SoftGuardSCPacketParser'' Else rec.rec_cdll End As rec_cdll ,
								cuv.cuv_clinkdss as clinkdss,
								RPM.rpm_cMarca,
								RPM.rpm_cModelo,
								Case When rec.rec_cdll=''EBSPacketParser'' Then IsNull(PAN.pan_cRemoteIP,'''') Else '''' End As EBSConsoleIP,
								Case When rec.rec_cdll=''ShellyPacketParser'' Then
									JSON_VALUE(REPLACE(REPLACE(JSON_VALUE(PAN.pan_cconfig, ''$.receptor''), ''\"'', ''"''), ''\\"'', ''"''),''$._urlID'')
									Else ''''  End As urlID,
								 Case When rec.rec_cdll=''ShellyPacketParser'' Then
									JSON_VALUE(REPLACE(REPLACE(JSON_VALUE(PAN.pan_cconfig, ''$.receptor''), ''\"'', ''"''), ''\\"'', ''"''), ''$._authkey'')
									Else '''' End As authkey
							  ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '

/*
 Print '------'
 Print CAST(@DynamicSqlReturnRows AS NTEXT)
 Print '------'
*/
 							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to