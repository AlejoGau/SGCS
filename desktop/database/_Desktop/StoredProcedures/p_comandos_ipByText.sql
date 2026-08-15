CREATE OR ALTER PROCEDURE p_comandos_ipByText
								@Text Varchar(128) = '',
								@Taxonomies Varchar(4000) = '',
								@PageCount int = 0,
								@PagePresent int = 1,
								@PageTotal int = 0 OutPut,
								@RowTotal int = 0 OutPut
							--WITH ENCRYPTION
							AS
								set nocount on
								
------------
declare @Filter varchar(4096)
if (substring(@Text, 1, 1) = '[')
begin
	set @Filter = @Text;
	set @Text = '';
end


IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		
		--Set Filters
		
		
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END
------------
								
							set @Text = '"' + @Text + '"'
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('p_comandos_ip')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([cmd_iid]) FROM [_Datos.dbo.p_comandos_ip])
							if(@PageCount = 0)
							begin
								SET @PageCount = @RowTotal
							end
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1

							set @sql = 'INSERT INTO #Taxo select tob.ObjectId from ObjectTaxonomy tob WHERE 1 = 1 '
							if @Taxonomies != ''
							begin

								declare @Count int
								declare @TaxonomyId varchar(100)
								
								set @Count = 1

								while((select count(*) from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count)>0)
								begin
									select @TaxonomyId = Value from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count
									set @Sql = @Sql + ' and  (select count(*) from ObjectTaxonomy where ObjectTypeId = ' + cast(@ObjectTypeId as varchar(10)) + ' And tob.ObjectTypeId = ObjectTypeId And ObjectId = tob.ObjectId and TaxonomyId in (select TaxonomyId from dbo.GetTaxonomyChilds(''' + @TaxonomyId + '''))) > 0 '
									set @Count = @Count + 1     
								end
							
							exec (@sql)

							end 

							set @RowTotal = (SELECT COUNT(t.[cmd_iid]) FROM [_Datos.dbo.p_comandos_ip] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[cmd_iid] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [cmd_tfechahora], [cmd_idCuenta], [cmd_idReceptor], [cmd_iComando], [cmd_cValores], [cmd_nEstado], [cmd_cObservaciones], [cmd_iEsCustom], [cmd_cAlarmaGenerar]
							FROM (
							SELECT t.[cmd_iid] Id, '' Name , t.[cmd_tfechahora], t.[cmd_idCuenta], t.[cmd_idReceptor], t.[cmd_iComando], t.[cmd_cValores], t.[cmd_nEstado], t.[cmd_cObservaciones], t.[cmd_iEsCustom], t.[cmd_cAlarmaGenerar] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[cmd_iid]  
								) AS RowNumber
							FROM [_Datos.dbo.p_comandos_ip] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[cmd_iid] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)

							) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo