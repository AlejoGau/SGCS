Ext.define('SmartTrack.controller.RoutesAgendaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesProgramSearchModel' ],
    views : [ 'RoutesAgendaFormView' ],

    init : function(config) {
        this.control({
            'routesagendaformview' : {
                beforerender : this.initview
            },
            'routesagendaformview button[action="save"]' : {
                click : this.onSaveClick
            }
        });
	}, // cierro init

	initview : function(view) {
        var storeAgenda = new Ext.data.SimpleStore({ fields: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'] })
        view.bindStore(storeAgenda);
        var controller = this;

        var filters = [{
            property: 'usu_iidcuenta',
            value: view.record.get('cue_iid')
        }];
        var storePrg =Ext.create('Ext.data.Store',{
            model: this.getRoutesProgramSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filters,
            sorters: [
                {
                    property : 'usu_iidcuenta',
                    direction: 'ASC'
                    //,root: 'data'
                }
            ]            
        })
        storePrg.load({
            callback: function(records){
                controller.loadAgenda(records,storeAgenda);
            }
        });

	},
    getRandomColor : function (){
    
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        while (randomColor.length< 6  ){
               randomColor += '0';

        }
        randomColor = randomColor.replace('f', '0');
        randomColor = randomColor.replace('e', '0');
        return "#" + randomColor;
    },
    loadAgenda : function (records,storeAgenda){
        var controller = this;
        var dom,lun,mar,mie,jue,vie,sab;
        
        records.forEach(function(record){
            dom = '';lun = '';mar = ''; mie = ''; jue = ''; vie = ''; sab = '';
            var backgroundcolor = controller.getRandomColor();
            var horario = Ext.util.Format.leftPad(record.get('starthour'),2,'0')+':'
                    +Ext.util.Format.leftPad(record.get('startminutes'),2,'0');            
            var bar = '<div style="height: 40px;color: white; background-color : '+backgroundcolor+'">'
                    +record.get('name')+' - Vigilador: '+record.get('usu_cnombre')+'<br>'
                    +horario+'</div>';            

            if(record.get('programtype') == 1) {
                dom = bar;
                lun = bar;
                mar = bar;
                mie = bar;
                jue = bar;
                vie = bar;
                sab = bar;                
            }else if(record.get('programtype') == 2) {
                lun = bar;
                mar = bar;
                mie = bar;
                jue = bar;
                vie = bar;
            } else if(record.get('programtype') == 3) {
                //var dom = bar;
                var dayofweek = record.get('dayofweek');
                if(dayofweek == 0) {
                    dom = bar;
                } else if(dayofweek == 1) {
                    lun = bar;
                } else if(dayofweek == 2) {
                    mar = bar;
                } else if(dayofweek == 3) {
                    mie = bar;
                } else if(dayofweek == 4) {
                    jue = bar;
                } else if(dayofweek == 5) {
                    vie = bar;                    
                } else if(dayofweek == 6) {
                    sab = bar;                
                }
                    
            } else if(record.get('programtype') == 4) {

                 bar = '<div style="height: 40px;color: white; background-color : '+backgroundcolor+'">'
                    +record.get('name')+' - '+record.get('usu_cnombre')+'<br>'
                    +getLocale('Todos los meses en el dia ')+record.get('dayofmonth')+getLocale(' en el horario: ')+horario
                    +'</div>';                  
                dom = bar;
                lun = bar;
                mar = bar;
                mie = bar;
                jue = bar;
                vie = bar;
                sab = bar;
            } else {
                dom = '-----';
                lun  = '-----';
                mar  = '-----';
                mie  = '-----';
                jue  = '-----';
                vie  = '-----';
                sab  = '-----';
            }          

            storeAgenda.add({
                dom: dom,
                lun: lun,
                mar: mar,
                mie: mie,
                jue: jue,
                vie: vie,
                sab: sab,
            });
        });
    },

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('routesformview');
		var record = myform.getRecord();
        var model = this.getRoutesModelModel();        
        record.setProxy(model.getProxy());
		myform.updateRecord(record);

        if (myform.isValid()){
            record.set('userId',view.down('#usuarios').getValue());
            if(!record.get('userId')) {
                record.set('userId',0);
            }
            if(record.get('userId') == 0) {
                notify ("No se realizará control sobre los usuarios que intervengan en la ronda");
            }

            record.set('datestart',new Date(record.get('datestart').setHours(12)));
            
    		record.save({
    			scope : this,
               
                view: view,
    			success: function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        //view.close();
                        
                        var pointsgrid= view.down('#pointsgrid')
                        pointsgrid.record = record;
                        pointsgrid.fireEvent('afterrecord', pointsgrid);
                        pointsgrid.setDisabled(false);

                        view.down('routespointsgridview').record = record;
                        view.down('routesprogramgridview').setRecord(record);
                        view.down('#programgrid').record = record;
                		view.down('#programgrid').setDisabled(false);
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
    			},
    			button : button
    		});
        }
	}
});