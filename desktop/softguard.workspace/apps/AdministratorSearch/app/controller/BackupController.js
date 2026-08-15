Ext.define('AdministratorSearch.controller.BackupController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'BackupView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'backupview' : {
				afterrender : this.initView
			},
            'backupview button[action=backup]': {
                click: this.onBackupClick
            }
            
		});
	},

	initView : function(view) {
       
       
	},
    

    onBackupClick: function(button, event, options) {    
        
       Ext.MessageBox.show({
           title: getLocale('Backup'),
           msg: getLocale('Describa el backup:'),
           width:300,
           buttons: Ext.MessageBox.OKCANCEL,
           multiline: true,
           fn: function (btn, text){
                notify('El backup fue realizado con exito');
           }
       });


        
    },
    
    
    
    

});