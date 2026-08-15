CREATE OR ALTER PROCEDURE [dbo].[t_iprsconeccionesSearch]
	@page [int] = 1,
	@start [int] = 0,
	@limit [int] = 500,
	@sort [varchar](256) = '',
	@group [varchar](256) = '',
	@filter [varchar](2048) = '',
	@_dc [varchar](256) = '',
	@totalrows [int] = 1 OUTPUT
WITH EXECUTE AS CALLER
AS
SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 --SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[iprsc_idKey] DESC')
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'r.[rec_cdescripcion] ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter,'')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Tablas].[dbo].[t_iprsconn] o
			inner join _tablas..t_ip_con ipc on (o.iprsc_ipcidkey = ipc.ipc_idkey)
			inner join _datos..m_receptores_cab r on (ipc.ipc_ireceptor = r.rec_iid)
            inner join _sistema..s_iprservicios s on (o.iprsc_iprsiid = s.iprs_idKey)
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)  
  --FJalil DSS-807 10/10/23 se modificó para que traiga el campo duplicado con minuscula y se cambió * por los campos que necesita el stored
SET @DynamicSqlReturnRows = '
    SELECT *
      FROM (
          SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
                 [iprsc_idKey] AS Id,
				 [iprsc_idKey],
                 [iprsc_iprsiid],
                 [iprsc_ipcidkey],
                 [iprsc_status],
                 [iprsc_config],
                 [iprsc_lastserviceupdate],
				 --[iprsc_pueidkey],
				 [iprsc_iduplicado],
                 [ipc_icodigo],
                 [ipc_cdescripcion],
                 [ipc_ireceptor],
                 [ipc_nestado],
                 [ipc_nport],
                 [ipc_nprotocolo],
                 [ipc_crespondeack],
                 [ipc_itiempoinactividad],
                 [ipc_cresetxhb],
                 [ipc_imodemsms],
                 [ipc_cremotehostip],
			     [ipc_idKey],
				 [ipc_cConfig],
                 [rec_iid],
                 [rec_cdescripcion],
                 [rec_cdll],
                 [rec_ntcpip],
                 [rec_iEsIRS],
				 [rec_cConfig],
				 [rec_iEsGPS],
				 [iprs_idKey],
                 [iprs_ccnombre],
				 [iprs_localip],
				 [iprs_commandport],
				 [iprs_websocketport],
				 [iprs_status],
				 [iprs_config],
				 [iprs_lastserviceupdate],
				 JSON_VALUE(iprsc_config, ''$.receptorSelected.rpm_cModelo'') As rpm_cModelo
          ' + @Sql + '
      ) AS T
      WHERE RowNumber BETWEEN @from AND @to';

							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
print '******************************************************************'
print CAST(@DynamicSqlReturnRows AS NTEXT)
*/

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to