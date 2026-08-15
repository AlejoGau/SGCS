CREATE OR ALTER PROCEDURE [dbo].[ProductUpdate]
										 @Id Int = 0,
										 @Name VarChar(128) = '',
										 			@SmallComment VarChar (2000) = '',
										 			@LargeComment VarChar (4000) = '',
										 			@Body Text = '',
										 			@Available VarChar (128) = '',
										 			@Price Decimal (9,2) = 0,
										 			@Structure VarChar (25) = '',
										 			@Weight Int = 0,
										 			@MetaDescription VarChar (2000) = '',
										 			@MetaKeywords VarChar (2000) = '',
										 			@Status VarChar (1) = '',
										 			@AttachId Int = 0,
										 			@Code VarChar (256) = '',
										 			@VAT Decimal (9,2) = 0,
										 			@Cost Decimal (9,2) = 0,
										 			@MeasureUnit VarChar (128) = '',
										 			@pro_iidorganizacion Int = 0,
										 			@pro_itipo Int = 0,
										 			@pro_currency Char (3) = '' 
							AS
										 set noCount on
										 update _datos..Product set Name = @Name ,[SmallComment] = @SmallComment,[LargeComment] = @LargeComment,[Body] = @Body,[Available] = @Available,[Price] = @Price,[Structure] = @Structure,[Weight] = @Weight,[MetaDescription] = @MetaDescription,[MetaKeywords] = @MetaKeywords,[Status] = @Status,[AttachId] = @AttachId,[Code] = @Code,[VAT] = @VAT,[Cost] = @Cost,[MeasureUnit] = @MeasureUnit,[pro_iidorganizacion] = @pro_iidorganizacion,[pro_itipo] = @pro_itipo,[pro_currency] = @pro_currency										
										 where [Id] = @Id										 
										 exec ProductSel @Id