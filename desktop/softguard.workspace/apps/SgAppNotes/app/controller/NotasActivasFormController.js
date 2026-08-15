Ext.define('SgAppNotes.controller.NotasActivasFormController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: ['SgNotesModel'],
    views: ['NotasActivasFormView'],
	init: function (config) {
		// genero los eventos

		this.control({
			'notasactivasformview': {
				afterrender: this.initview,
				refresh: this.refresh,
				refreshlikeinit: this.refreshLikeInit
			},
			'notasactivasformview button[action="save"]': {
				click: this.onSaveClick
			},
			'notasactivasformview button[action="cancel"]': {
				click: this.onCancelClick
			}

		});
    }, // cierro init
	refreshLikeInit: function (view, rec) {
		this.initview(view)
    },
	refresh: function (view, rec) {
		/*view.loadRecord(rec);

		if (rec.get('usu_cimagen') != '') {
			view.down('#usu_cimagen').setSrc('/gallery/' + rec.get('usu_cimagen') + '?_dc=' + Math.floor((Math.random() * 1000) + 1))
		}

		if (view.caller) {
			view.caller.fireEvent('refresh', view.caller, rec);
		}*/
    },
    initview: function (view) {
		view.loadRecord(view.record);
		if(view.readOnly){
			view.down('#guardarBtn').hide();
			view.down('#note').setReadOnly(true);
		}
	},
	onSaveClick: function(button,event,options){
		var myform = button.up('form').getForm();
		var view = button.up('notasactivasformview');
		var caller = view.caller;
        var win = button.up('window');
		var mymodel = myform.getRecord();
		//var oldname = mymodel.get('Name');
		console.log('new date ', new Date())
		myform.updateRecord(mymodel);
		//var newname = mymodel.get('Name');
		mymodel.set('sgn_userid',_UserData.udw_idKey);
		mymodel.set('sgn_datecreated',new Date());
		mymodel.save({
			scope : this,
            win: win,
            view: view,
			callback : function(record, operation) {
                notify('Los datos se guardaron correctamente');
                var mywin = operation.win;
                var view = operation.view;
                if (view){
                    view.fireEvent('objectchanged',operation);
                    if (mywin){
						mywin.close();
						caller.store.load();
					}
                }
                else {console.log(view);}
			},
			button : button
		});
			console.log('mymodel log', mymodel)
	},
	onCancelClick: function(button,event,options){
		
        button.up('window').close();
        
	}

});