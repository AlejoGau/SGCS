CREATE OR ALTER PROCEDURE [dbo].[SearchMessage]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   

 declare @iAjustaHora int = 0
 Set @iAjustaHora = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO' )   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[Id] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Message')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..[Message] o
			left join _datos..p_rxtrainfo on rxt_irecid = eventoid And eventoid !=0
			left JOIN [_Datos].[dbo].[m_cuentas] c ON c.cue_iid = o.CuentaID
			left join _tablas..t_timezone gmt on c.cue_iZonaHoraria = gmt.ttz_idkey
			left join _Sistema.dbo.[UsersDesktopWeb] u ON u.udw_idKey = o.FromId
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT *
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, [Id]
      ,[Name]
      ,[Body]
      ,CASE 
		WHEN gmt.ttz_idkey is not null and gmt.ttz_idkey > 0 and '+convert(varchar(1),@iAjustaHora)+' >0
		 THEN convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (DateCreated, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0.00)*60)) 
		ELSE 
			DateCreated
		END as DateCreated
      ,[DateRead]
      ,[FromTypeId]
      ,[FromId]
      ,[ToTypeId]
      ,[ToId]
      ,[MessageType]
      ,[Status]
      ,[Customdata]
      ,[EventoID]
      ,[CuentaID]
			, u.udw_usuario as FromName
			, u.udw_usuario
			, u.udw_idKey
	  ,CASE 
		WHEN gmt.ttz_idkey is not null and gmt.ttz_idkey > 0 and '+convert(varchar(1),@iAjustaHora)+' >0
		 THEN CONVERT(varchar, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (DateCreated, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0.00)*60)) , 126)
		ELSE 
			CONVERT(varchar, DateCreated, 126)
		END as DateCreatedIso
 ,CONVERT(varchar, DateRead, 126) DateReadIso,
 rxt_nspip,rxt_nspsms ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 print @DynamicSqlReturnRows
 				  			  	 
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
/*
 -- sacar tabla temporal y dejar paginacion std
CREATE TABLE #tmpBus
(
	RowNumber int,
	[Id] [int] NOT NULL,
	[Name] [varchar](128) NULL,
	[Body] [varchar](max) NULL,
	[DateCreated] [datetime] NULL,
	[DateRead] [datetime] NULL,
	[FromTypeId] [int] NULL,
	[FromId] [int] NULL,
	[ToTypeId] [int] NULL,
	[ToId] [int] NULL,
	[MessageType] [varchar](128) NULL,
	[Status] [varchar](128) NULL,
	[Customdata] [varchar](max) NULL,
	EventoID int null,
	CuentaID int null,
	rxt_nspip numeric(1,0) null,
	rxt_nspsms numeric(1,0) null,
	DateCreatedIso varchar(128),
	DateReadIso varchar(128)
	
)
INSERT INTO #tmpBus 
EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to


print @DynamicSqlReturnRows

select * , 
(select top 1 udw_usuario from _Sistema.dbo.[UsersDesktopWeb] u
where u.udw_idKey = t.FromId) FromName,
(select top 1 udw_usuario from _Sistema.dbo.[UsersDesktopWeb] u
where u.udw_idKey = t.ToId) ToName

from #tmpBus t
*/
/*3050	UsersDesktopWeb
3051	UsersDesktopWebModulos
*/