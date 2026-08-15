--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.230 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.467 
--#############################################################################



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[TaxonomyDeleteParentObjectTaxonomy]
	-- Add the parameters for the stored procedure here
	@ObjectTypeId int,
	@ObjectId int
AS
BEGIN
	SET NOCOUNT ON;
print 'start'
--	DECLARE @otworking TABLE 

	create table #otworking 
	(RowNum int primary key identity(1,1)
		,Id int
		,ObjectTypeId int
		,ObjectId int
		,TaxonomyId int
		,FirstParentId int
	)

	--Por cada Tilde del person
	insert into #otworking (Id, ObjectTypeId, ObjectId, TaxonomyId, FirstParentId)
    select Id, ObjectTypeId, ObjectId, TaxonomyId, FirstParentId from objecttaxonomy where objecttypeid = @ObjectTypeId and ObjectId = @ObjectId



	declare @RowCount int
	select @RowCount = count(*) from #otworking
	declare @RowCurrent int 
	set @RowCurrent = 0
print 'RowCount: ' + cast(@RowCount as NVARCHAR(10))

	declare @CurrentParentId int
	declare @TaxonomyId int
	declare @ParentTaxonomyId int

	while(@RowCurrent < @RowCount)
	begin
		set @RowCurrent = @RowCurrent + 1;

		select @TaxonomyId = TaxonomyId from #otworking where rownum = @RowCurrent
		print 'TaxonomyId: ' + cast(@TaxonomyId as NVARCHAR(10))
		select @ParentTaxonomyId = ParentId from taxonomies where id = @TaxonomyId
		--Ciclamos los padres del taxonomy (recursivo) eliminando sus tildes
		while(@ParentTaxonomyId != 0)
		begin
			print cast(getdate() as NVARCHAR(55)) +  'ParentTaxonomyId: ' + cast(@ParentTaxonomyId as NVARCHAR(10))
			delete from objecttaxonomy 
				where taxonomyid = @ParentTaxonomyId 
				and ObjectTypeId = @ObjectTypeId
				and ObjectId = @ObjectId

			set @TaxonomyId = @ParentTaxonomyId
			select @ParentTaxonomyId = ParentId from taxonomies where id = @TaxonomyId
		end

	end

	drop table #otworking
END