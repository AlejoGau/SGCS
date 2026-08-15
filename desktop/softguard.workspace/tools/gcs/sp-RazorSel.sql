							CREATE   Procedure [dbo].[RazorSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [SmallComment], [Razor], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]
							  			 from [Razor]
							 			  where [Id] = @Id
