
/****** Object:  UserDefinedFunction [dbo].[GetAllChildsWithCarac]    Script Date: 12/30/2011 11:10:33 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetAllChildsWithCarac](@IdCarac Varchar(8000))
RETURNS @T Table (ID int identity primary key, IDcarac Int UNIQUE)
AS
BEGIN
Declare @count int
Insert Into @T select strval from dbo.ParseArray(@IdCarac, ', ')
set @count=1
while (exists(select id from @T where id = @count))
  begin
      insert into @T Select idHijo from CMSArbol where idpadre = (select idcarac from @T where id=@count) and idhijo<>0
      set @count = @count + 1		
  end 
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetAllChildsWithCaracAll]    Script Date: 12/30/2011 11:10:36 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetAllChildsWithCaracAll](@IDCarac Varchar(8000))
RETURNS @T Table (id int identity primary key, IDCarac Int UNIQUE, Descripcion varchar(256), Level int null, Parent int, FirstParent int)
AS
BEGIN
Declare @count int,
	@ln_level int,
	@ln_idcarac int,
	@ln_firstParent int
if @IDCarac is null
   Insert Into @T (IDCarac, Descripcion, Level, Parent, FirstParent) select d.IDCarac, d.Descripcion, 0, 0, d.IDCarac from CMSArbol a inner join CMSDescripcion d on a.IDPadre = d.IDCarac where a.IDHijo=0
else
   Insert Into @T (IDCarac, Descripcion, Level, Parent, FirstParent) select a.strval, d.Descripcion, 0, 0, a.strval from dbo.ParseArray(@IDCarac,',') a inner join CMSDescripcion d on a.strval = d.IDCarac
set @count=1
while (exists(select id from @T where id = @count))
  begin
      select @ln_level = Level+1,  @ln_idcarac = idcarac, @ln_firstParent = FirstParent from @T where id=@count
      insert into @T (IDCarac, Descripcion, Level, Parent, FirstParent) Select c.IDHijo, d.Descripcion, @ln_level, c.IDPadre, @ln_firstParent from CMSArbol c inner join CMSDescripcion d  on c.IDHijo = d.IDCarac where IDPadre = @ln_idcarac and IDHijo<>0
      set @count = @count + 1		
  end 
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetAllChildsWithTaxonomy]    Script Date: 12/30/2011 11:10:37 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetAllChildsWithTaxonomy](@Taxonomies Varchar(8000))
RETURNS @T Table (Id int identity primary key, TaxonomyId Int UNIQUE)
AS
BEGIN
Declare @Count int
Insert Into @T select strval from dbo.ParseArray(@Taxonomies, ',')
set @Count=1
while (exists(select Id from @T where Id = @Count))
  begin
      insert into @T Select ChildId from TaxonomyTree where ParentId = (select TaxonomyId from @T where Id=@Count) and ChildId<>0
      set @Count = @Count + 1		
  end 
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetAllChildsWithUser]    Script Date: 12/30/2011 11:10:39 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetAllChildsWithUser](@IdUser int)
RETURNS @T Table (ID int identity primary key, IDcarac Int UNIQUE)
AS
BEGIN
Declare @count int
Insert Into @T select IDCarac from SEGCaracteristicasADM where usuario = @IdUser
set @count=1
while (exists(select id from @T where id = @count))
  begin
      insert into @T Select idHijo from CMSArbol where idpadre = (select idcarac from @T where id=@count) and idhijo<>0
      set @count = @count + 1		
  end 
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetAllParentWithCarac]    Script Date: 12/30/2011 11:10:40 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetAllParentWithCarac](@ID int)
RETURNS @T Table (IDCarac Int Primary Key)
AS
BEGIN
declare @Padre int
insert into @T (IDCarac) values (@ID)
--set @id = 1
while(exists(Select IDPadre From CMSArbol Where IDHijo = @ID))
  begin      	            
      Select @Padre = IDPadre From CMSArbol Where IDHijo = @id	 
      insert into @T (IDCarac) values (@Padre)
      set @ID = @Padre
  end	
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetAllParentWithTaxonomy]    Script Date: 12/30/2011 11:10:41 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetAllParentWithTaxonomy](@TaxonomyId int)
RETURNS @T Table (TaxonomyId Int Primary Key)
AS
BEGIN
declare @ParentId int
insert into @T (TaxonomyId) values (@TaxonomyId)
while(exists(Select ParentId From TaxonomyTree Where ChildId = @TaxonomyId))
  begin      	            
      Select @ParentId = ParentId From TaxonomyTree Where ChildId = @TaxonomyId
      insert into @T (TaxonomyId) values (@ParentId)
      set @TaxonomyId = @ParentId
  end	
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[getChildsCarac]    Script Date: 12/30/2011 11:10:41 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[getChildsCarac](@IdCarac Varchar(8000))
RETURNS @T Table (ID int identity primary key, IDcarac Int)
AS
BEGIN
Declare @count int
Insert Into @T select strval from dbo.ParseArray(@IdCarac, ', ')
set @count=1
while (exists(select id from @T where id = @count))
  begin
      insert into @T Select idHijo from CMSArbol where idpadre = (select idcarac from @T where id=@count) and idhijo<>0
      set @count = @count + 1		
  end 
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetTaxonomyChilds]    Script Date: 12/30/2011 11:10:41 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[GetTaxonomyChilds](@Taxonomies Varchar(8000))
RETURNS @T Table (Id int identity primary key, TaxonomyId Int)
AS
BEGIN
Declare @Count int
Insert Into @T select strval from dbo.ParseArray(@Taxonomies, ',')
set @Count=1
while (exists(select Id from @T where id = @Count))
  begin
      insert into @T Select ChildId from TaxonomyTree where ParentId = (select TaxonomyId from @T where Id=@count) and ChildId<>0
      set @Count = @Count + 1		
  end 
Return
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetUserChilds]    Script Date: 12/30/2011 11:10:42 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE Function [dbo].[GetUserChilds](@UserId int)
RETURNS @T Table (Id int identity primary key, UserId Int UNIQUE)
AS
BEGIN

Declare @Count int
Declare @User int
Insert Into @T select Id from UserAccount where Id = @UserId

set @Count=1
while (exists(select Id from @T where id = @Count))
  begin     
      insert into @T select distinct RelationObjectId from RelationObject where ObjectTypeId = 1 and ObjectId =  (select UserId from @T where Id=@count) and RelationObjectTypeId = 1 and RelationObjectId not in (select UserId from @T)
      set @Count = @Count + 1		
  end 
Return
END






GO

/****** Object:  UserDefinedFunction [dbo].[ParseArray]    Script Date: 12/30/2011 11:10:42 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[ParseArray]( @Array	varchar(8000),
				@separator varchar(4) )
Returns @strtable Table (strval	varchar(100))
As
Begin
	declare @separator_position int
	declare @array_value varchar(100) -- this holds each array value as it is returned
	
	set @array = @array + @separator
	
	while patindex('%' + @separator + '%' , @array) <> 0 
	begin 
	  set @separator_position =  patindex('%' + @separator + '%' , @array)
	  set @array_value = left(@array, @separator_position - 1)
	
	  Insert into @strtable values (@array_value)
	
	  set @array = stuff(@array, 1, @separator_position, '')
	end	
	Return
End


GO

/****** Object:  UserDefinedFunction [dbo].[ParseArrayWithId]    Script Date: 12/30/2011 11:10:43 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Function [dbo].[ParseArrayWithId]( @Array	varchar(8000),
				@separator varchar(4) )
Returns @strtable Table (Id int identity primary key, Value varchar(100))
As
Begin
	declare @separator_position int
	declare @array_value varchar(100) -- this holds each array value as it is returned
	
	set @array = @array + @separator
	
	while patindex('%' + @separator + '%' , @array) <> 0 
	begin 
	  set @separator_position =  patindex('%' + @separator + '%' , @array)
	  set @array_value = left(@array, @separator_position - 1)
	
	  Insert into @strtable values (@array_value)
	
	  set @array = stuff(@array, 1, @separator_position, '')
	end	
	Return
End


GO

/****** Object:  UserDefinedFunction [dbo].[GetObjectId]    Script Date: 12/30/2011 11:12:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [dbo].[GetObjectId] (@ObjectName varchar(50))  
RETURNS int AS  
BEGIN 

return (select Id from Object where Name=@ObjectName)

END




GO

/****** Object:  UserDefinedFunction [dbo].[GetOrganizationByPerson]    Script Date: 12/30/2011 11:12:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE  FUNCTION [dbo].[GetOrganizationByPerson] (@Id int)  
RETURNS varchar(128) AS  
BEGIN 
	declare @Organization varchar(128)
	
	declare @ObjectPerson int
	declare @ObjectOrganization int
	
	select @ObjectPerson = dbo.GetObjectId('Person'), @ObjectOrganization = dbo.GetObjectId('Organization')
	
	--select top 1 @Organization = '<a href="/Admin/Organization/Organization.aspx?Id='+cast(o.Id as varchar)+'">'+o.Name+'</a>'
	select top 1 @Organization = o.Name
	  from RelationObject r
	       inner join Organization o on o.Id = r.RelationObjectId 
	 where r.ObjectTypeId = @ObjectPerson 
	       and r.ObjectId = @Id
	       and r.RelationObjectTypeId = @ObjectOrganization

	return isnull(@Organization,'')
END




GO

/****** Object:  UserDefinedFunction [dbo].[GetTaxonomyFirstParentId]    Script Date: 12/30/2011 11:12:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[GetTaxonomyFirstParentId] (@ChildId int)
RETURNS int AS  
BEGIN 
Declare @t int,
	@FirstParentId int
set @FirstParentId=@ChildId
set @t=1
while @t<>0
BEGIN
	set @t=(Select dbo.GetTaxonomyParentId(@FirstParentId))
	if @t<>0
	BEGIN
		Set @FirstParentId=@t
	END
END
return @FirstParentId
END


GO

/****** Object:  UserDefinedFunction [dbo].[GetTaxonomyParentId]    Script Date: 12/30/2011 11:12:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE FUNCTION [dbo].[GetTaxonomyParentId] (@ChildId int)
RETURNS int AS  
BEGIN 
Declare @ParentId int
set @ParentId=(select isnull(ParentId,0) from TaxonomyTree where ChildId=@ChildId)
return isnull(@ParentId,0)
END


GO

