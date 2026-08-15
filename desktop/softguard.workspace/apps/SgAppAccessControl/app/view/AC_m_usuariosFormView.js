Ext.define('SgAppAccessControl.view.AC_m_usuariosFormView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.ac_m_usuariosformview'],
	border: 0,
	bodyPadding: 0,
	layout: 'fit',
	items: [ {
					xtype: 'tabpanel',
					flex: 1,
					height: '100%',
					itemId: 'tabpanelUserInvitationEditor',
					items: [
						{							
							xtype: 'fieldset',
							title: 'Informacion del invitado',
							defaultType: 'displayfield',
							layout:'center',
							items: [{
								xtype: 'container',
								flex: 1,
								layout: 'vbox',
								items: [{
									xtype: 'image',
									src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNy4wMDFjMCAzLjg2NS0zLjEzNCA3LTcgN3MtNy0zLjEzNS03LTdjMC0zLjg2NyAzLjEzNC03LjAwMSA3LTcuMDAxczcgMy4xMzQgNyA3LjAwMXptLTEuNTk4IDcuMThjLTEuNTA2IDEuMTM3LTMuMzc0IDEuODItNS40MDIgMS44Mi0yLjAzIDAtMy44OTktLjY4NS01LjQwNy0xLjgyMi00LjA3MiAxLjc5My02LjU5MyA3LjM3Ni02LjU5MyA5LjgyMWgyNGMwLTIuNDIzLTIuNi04LjAwNi02LjU5OC05LjgxOXoiLz48L3N2Zz4=',
									minHeight: 100,
									maxHeight:200,
									minWidth:100,
									maxWidth:200,
									name: 'usu_cimagen',
									itemId: 'usu_cimagen',
								}, {
									xtype: 'button',
									text: 'Cambiar foto',
									width: 200,
									style: {
										marginTop: '20px',
										marginBottom: '20px'
									},
									handler: function () {
			
										var view = this.up('ac_m_usuariosformview')
										var uiapplication = 'AccessControl';
										var model = Ext.ClassManager.get('Common.model.m_usuariosModel')
			
										var w = Ext.widget('window', {
											title: 'Foto: ',
											height: 252,
											width: 360,
											closeAction: 'destroy',
											border: false,
											layout: 'fit',
											items: [{
												xtype: 'form',
												padding: '10 0 0',
												url: '/Rest/upload/new?search=softguardMiscFile',
												items: [{
													xtype: 'filefield',
													buttonOnly: true,
													width: 100,
													buttonConfig: {
														text: 'Subir imagen',
														width: '100%'//,
														//ui: 'default-toolbar-small'
													},
													listeners: {
														change: function (filefield, value) {
			
															filefield.up('form').submit();
			
															model.load(view.record.get('Id'), {
																callback: function (record) {
																	record.set('usu_cimagen', value.replace(/C:\\fakepath\\/g, ''));
			
																	record.save({
																		callback: function (record, operation) {
																			if (operation.success) {
																				notify('Los datos se guardaron con éxito');
																				view.fireEvent('refresh', view, record)
																			}
																		}
																	})
			
																}
															})
														}
													}
												}, 
												{
													xtype: 'button',
													text: 'Tomar una imagen desde la camara',
													width:'100%',
													handler: function () {
			
														var localMediaStream;
														var w = Ext.widget('window', {
															title: 'Foto: ',
															height: 400,
															width: 800,
															closeAction: 'destroy',
															border: false,
															layout: 'hbox',
															listeners: {
																afterrender: function () {
																	navigator.getUserMedia = navigator.getUserMedia ||
																		navigator.webkitGetUserMedia ||
																		navigator.mozGetUserMedia ||
																		navigator.msGetUserMedia;
																	var video = document.getElementById("video");
																	var canvas = document.getElementById("canvas");
																	var context = canvas.getContext("2d");
			
																	navigator.getUserMedia({
																		video: true
																	}, function (stream) {
			
																		if (video.mozSrcObject !== undefined) {
																			localMediaStream = stream;
																			video.mozSrcObject = stream;
																		} else {
																			video.srcObject = stream;
																		}
			
																		var pngUrl = canvas.toDataURL()
			
																	}, function (err) {
			
																		console.log("The following error occured: " + err);
																	});
			
																}
															},
															items: [
																{
																	width: 400,
																	title: "Preview",
																	height: 400,
																	id: 'preview',
																	html: '<video  id="video" width="400" height="320" autoplay style="backgound-color:#000; -webkit-mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0, 0, 0, 0.6) 50%); mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0, 0, 0, 0.6) 50%);"></video>',
																	tbar: [{
																		text: "Snapshot",
																		handler: function () {
																			var video = document.getElementById("video");
																			var canvas = document.getElementById("canvas");
																			context = canvas.getContext("2d");
																			context.drawImage(video, 0, 0, 400, 320);
																			//falta qeu suba la iamgen y apage la camara
																			var filename = 'snapshot-' + view.record.get('Id') + '.png';
																			Ext.Ajax.request({
																				url: '/handler/uploadFile',
																				method: 'POST',
																				params: {
																					fileName: filename,
																					fileBase64: canvas.toDataURL().replace('data:image/png;base64,', '')
			
																				},
																				scope: this,
																				success: function (response) {
																					notify('subio')
			
																					model.load(view.record.get('Id'), {
																						callback: function (record) {
																							record.set('usu_cimagen', filename);
			
																							record.save({
																								callback: function (record, operation) {
																									if (operation.success) {
																										notify('Los datos se guardaron con éxito');
																										view.fireEvent('refresh', view, record)
																									}
																								}
																							})
			
																						}
																					})
																				}
																			})
																		}
																	}]
																},
																{
																	width: 400,
																	title: "Snapshot",
																	height: 400,
																	html: '<canvas id="canvas" width="400" height="320"></canvas>'
																}
															],
															autoShow: true,
															modal: true
														});
														w.show()
			
			
													}
												}]
											}],
											autoShow: true,
											modal: true
										});
										w.show()
									}
								},
								{
									xtype: 'displayfield',
									fieldLabel: 'Nombre',
									name: 'usu_cnombre'
								},
								{
									xtype: 'displayfield',
									fieldLabel: 'Identificacion',
									name: 'usu_cidentificacion'
								},
								{
									xtype: 'displayfield',
									fieldLabel: 'Observacion'
								},
								{
									xtype: 'displayfield',
									fieldLabel: '',
									name: 'usu_mobservacion',
									width: 100
								},{
									xtype: 'button',
									text: 'Editar información',
									width: 200,
									itemId: 'cambiodatosusuarioinfoinvitado'
								}							
							]
							}]
						}					
						



										,{					
											xtype: 'fieldset',
											title: 'Informacion del vehículo',
											defaultType: 'displayfield',
											layout:'center'// {
											//	type: 'hbox',
												//align: 'stretch',
											//}
											,	
											autoScroll : true,										
											items: [{
												xtype: 'container',
												
												flex: 1,
												width: '30%',
												
												items: [
													{xtype:'container',
													flex:1,
													//width:'60%',
													layout: {
														type: 'vbox',
														align: 'stretch',
													},
														items:[
																{
																	xtype: 'image',
																	src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+',
																	minHeight: 100,
																	maxHeight:200,
																	minWidth:100,
																	maxWidth:200,
																	name: 'Photo',
																	itemId: 'Photo',
																},{
																	xtype: 'displayfield',
																	fieldLabel: 'Matrícula',
																	itemId: 'domainLabel',
																	width: 220
																}
																,{
																	xtype: 'button',
																	text: 'Editar información',
																	itemId: 'cambiodatosusuario'
																}
													
															]
														}
															
													
												]			
												}
												/*,{

													xtype:'container',
													flex: 1,
													width:'70%',
													autoScroll : true,	
													layout: {
														type: 'vbox',
														align: 'stretch',
													},													
													items:[
														{
															itemId:'m_usuariosformviewPanel'//,
															//html:'HOLA'
														}
													]
												}*/													
										
											]	
													
									
											
										


										},{
											xtype: 'p_controlacceso_ioview',
											viewConfig:{
												infoABierta:true
											},
											title: 'Accesos',
										}, {
											xtype: 'p_controlacceso_autorizacionview',
											itemId: 'autorizacionesTab',
											title: 'Autorizaciones',
										}
											
					
					]
				}					
	],

	initComponent: function () {

		this.callParent();

		this.down('p_controlacceso_ioview').record = this.record
		this.down('p_controlacceso_autorizacionview').record = this.record

		/*var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
		    items: [
		              ,
		    ]// cierro items
		 }); 
		 this.addDocked(toolbar);*/
	} // cierro init

});