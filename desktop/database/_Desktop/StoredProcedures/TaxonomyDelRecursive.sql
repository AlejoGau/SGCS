CREATE OR ALTER PROCEDURE [dbo].[TaxonomyDelRecursive]
       @Id int
	,@justchilds int --0 false, 1 true
AS

--print 'Processing ' + cast(@id as varchar(5))

create table #childs (rownum int primary key identity (1,1), Id int, TaxonomyId int)
insert into #childs (Id, TaxonomyId)
Select * from dbo.GetAllChildsWithTaxonomy(@Id) where taxonomyid != @Id
  
       declare @ChildCount int

       Select @ChildCount = count(*) from #childs
       if(@ChildCount > 1)
	begin

		declare @currentnum int
		declare @currentid int

		set @currentnum = 0

		while(@currentnum < @ChildCount)
		begin
			set @currentnum = @currentnum + 1

			select @currentid = Taxonomyid from #childs where rownum = @currentnum

			exec TaxonomyDelRecursive @currentid, 0
		end
	end

--print 'JustChilds' + cast(@justchilds as varchar(1))
	if @justchilds <> 1
	begin
		delete from TaxonomyValue where Id = @Id
		delete from TaxonomyTree where ParentId = @Id or ChildId = @Id	
		delete from ObjectTaxonomy where TaxonomyId = @Id
		delete from SyncRelations where ObjectId = @Id and Class in ('categoria', 'rubro', 'subrubro')
	end