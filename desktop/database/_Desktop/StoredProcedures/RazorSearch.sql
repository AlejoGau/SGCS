CREATE OR ALTER PROCEDURE [dbo].[RazorSearch]  
        @Text Varchar(128) = '',  
        @Taxonomies Varchar(4000) = '',  
        @Limit int = 0,  
        @Page int = 0,  
        @Start int = 0,  
        @Group varchar(max) = null,  
        @Sort varchar(max) = null,  
        @PageTotal int = 0 OutPut,  
        @RowTotal int = 0 OutPut  
       --WITH ENCRYPTION  
       AS  
        set nocount on  
          
       set @Text = '"' + @Text + '"'  
         
       declare @PageCount int   
       set @PageCount = @Limit  
       declare @PagePresent int   
       set @PagePresent = @Page  
         
       declare @From int  
       declare @Even int  
       declare @sql Varchar(8000)   
       declare @ObjectTypeId int  
                 
       select @ObjectTypeId = dbo.GetObjectId('Razor')  
  
       CREATE TABLE #Taxo (Id int)  
  
  
       set @RowTotal = (SELECT COUNT([Id]) FROM [Razor])  
       if(@PageCount = 0)  
       begin  
        SET @PageCount = @RowTotal  
       end  
       set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))  
       set @From = @Start--@PageCount * @PagePresent - @PageCount  
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
         set @Sql = @Sql + ' and  (select count(*) from ObjectTaxonomy where ObjectTypeId = ' + cast(@ObjectTypeId as varchar(10)) + ' And tob.ObjectTypeId = ObjectTypeId And ObjectId = tob.ObjectId and TaxonomyId in (select TaxonomyId from dbo.GetTaxonom
yChilds(''' + @TaxonomyId + '''))) > 0 '  
         set @Count = @Count + 1       
        end  
         
       exec (@sql)  
  
       end   
  
       set @RowTotal = (SELECT COUNT(t.[Id]) FROM [Razor] t   
       LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])  
         
       set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))  
       set @From = @PageCount * @PagePresent - @PageCount  
       set @Even = @From + @PageCount + 1   
         
       SELECT Id, Name, [SmallComment], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]  
       FROM (  
       SELECT t.[Id] Id,  Name, t.[SmallComment], t.[Version], t.[DateCreated], t.[DateModified], t.[RazorType], t.[OutputMimeType] , taxo.Id as Taxo,  
       ROW_NUMBER() OVER(  
       ORDER BY t.[Id]    
        ) AS RowNumber  
       FROM [Razor] t   
       LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id]   
       WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt  
       WHERE RowNumber > @From  
       AND RowNumber < @Even  
  
  
       drop Table #Taxo