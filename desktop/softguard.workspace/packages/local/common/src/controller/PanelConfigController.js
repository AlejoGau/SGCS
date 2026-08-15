//MIGRADO2024
Ext.define('Common.controller.PanelConfigController', {
			extend : 'Ext.app.Controller',
    		stores : [ 'Common.store.PortalPanelStore', 'Common.store.TablaColumnasStore' ],
			models : [ 'PortalPanelModel', 'NameValueModel' ],
			views : [ 'PanelConfigView' ],
			refs : [{
						ref : 'modulesTree',
						selector : 'modulestree'
					}, {
						ref : 'comboColumnCount',
						selector : 'panelconfigview > combobox'
					}],
			init : function(config) {
				this.control({
							'tab' : {
								click : this.openConfig
							},
							'panelconfigview' : {
								beforerender : this.initview
							},
							'panelconfigview button[text="Aplicar Cambios"]' : {
								click : this.save
							},
							'panelconfigview button[text="Eliminar Panel"]' : {
								click : this.deletePanel
							}
						})
			}, // cierro init
			initview : function(myview) {
				//console.log(myview.down('combobox').store)
			},
			
			openConfig : function(event, element, options) {
				// console.log(arguments);
			},
			save : function(button, event, options) {
				/*
				 * pasar a funcion separada
				 */
				// obtengo el tabpanel
				myview = button.up('portalpanelview');
				// cambio la cantidad de columnas al panel
				// accedo al registro y lo salvo
				myform = button.up('form').getForm();
				mymodel = myform.getRecord();
				oldname = mymodel.get('Name');
				myform.updateRecord(mymodel);
				newname = mymodel.get('Name');
				mymodel.save({
							scope : this.application,
							callback : this.syncpanel,
							button : button
						});
			},
			syncpanel : function(records, operation, success) {
				// ahora regenero el portal panel
				var myportalpanel = myview.down('portalpanel');
				var button = operation.button;
				
				mytab = Ext.getCmp('tab-panel').getActiveTab();
				if (oldname != newname) {
					mytab.setTitle(newname);
				}
				// solo si cambia la cantidad de columnas
				myportalpanel.removeAll();
				this.getController('PortalPanelController').initView(myview);
				// Seteo el nuevo nombre en el arbol y paleta
			},
			deletePanel : function(button, event, options) {
				var mytab = Ext.getCmp('tab-panel').getActiveTab();
				
				// Elimino todos los portlets del panel
				var myportlets=mytab.down('.portlet');
				
				// Elimino el panel
				// accedo al registro y lo elimino
				var mypanelstore = this.getPortalPanelStoreStore();
				mymodel = button.up('form').getRecord();
				oldname = mymodel.get('Name');
				mymodel.destroy({
							scope : this.application
						});
				// borro el tab
				
				mytab.destroy();
				// elimino el panel del arbol
				var mytreestore = this.getController('PanelConfigController')
						.getModulesTree().getStore();
				var mytreerecord = mytreestore.getRootNode().findChild('text',
						oldname, true);
				mytreerecord.destroy();
			}
		});