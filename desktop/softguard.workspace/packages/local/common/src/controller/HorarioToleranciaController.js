//MIGRADO2024
Ext.define('Common.controller.HorarioToleranciaController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.HorarioToleranciaModoControlHorarioStore', 'Common.store.HorarioCierreAntesAlarmaStore', 'Common.store.HorarioCierreDespuesAlarmaStore', 'Common.store.HorarioAperturaAntesAlarmaStore', 'Common.store.HorarioAperturaDespuesAlarmaStore', 'Common.store.HorarioEventoStore', 'Common.store.SiNoStore' ],
    models : [ 'HorarioToleranciaSearchModel', 'HorarioToleranciaModel' ],
    views : [ 'HorarioToleranciaView' ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'horariotoleranciaview button[action=save]': {
                click: this.onSaveClick
            },
            'horariotoleranciaview':{
                beforerender: this.initView
            }

        });

    }, // cierro init
    
    initView : function(view) {
        var cuenta = view.record;
        view.cuenta = cuenta;
        var controller = this;
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;
        
        if (profile < 2){
            view.down('toolbar').hide();
            view.down('#paneltolerancia').down('toolbar').hide();
            Ext.Array.each(view.getForm().getFields().items,function (field) {
                field.setDisabled(true)
            })
        }
        
        var objectId = cuenta.get('cue_iid');
        
        try{
        
        	/*this.getHorarioToleranciaModelModel().load(objectId, {
                view: view,
                scope: this,
    			success : function(record,operation) {
                   
                    
                    
    			},
    			failure : function() {
    				console.log(arguments)
    			}// cierro function
    		}); // cierro load
            */
            
            view.store = Ext.create('Ext.data.Store', {
                model : this.getHorarioToleranciaSearchModelModel(),
                remoteFilter: true,
                autoload: false,
                filters: [{
                        property:'tol_iidcuenta',
                        value:objectId
                        }]
            }).load({callback:function (records) {
                    if (records.length<=0){
                        controller.createRecord(view);
                    } else {
                        var record = records[0]    
                        if(record.get('tol_dVacacionesHasta') <= new Date ('01/01/1970')) {
                            record.set('tol_dVacacionesHasta','');
                        }
                        
                        if(record.get('tol_dVacacionesDesde') <= new Date ('01/01/1970')) {
                            record.set('tol_dVacacionesDesde','');
                        }
                        
                        
                        for(var f in record.data)
                        {
                            var date = record.get(f);
                            if(f.search("tol_d")>0  && (new Date(date)).getTime() == 0){
                                record.set(f, null);
                            }
                        }
    
                        view.record=record;
                        view.loadRecord(view.record);
                    }
            
            
            }});
        } catch (e) {
            controller.createRecord(view);
        }
	},

    createRecord: function(view){
        var model = this.getHorarioToleranciaModelModel();
        var cuenta = view.cuenta;
        view.record = model.create({
            tol_iidcuenta: cuenta.get('Id'),
            tol_naperturaantes:1,
            tol_naperturadespues:1,
            tol_ncierreantes:1,
            tol_ncierredespues:1
        });
        view.record.set("Id",0);
        view.loadRecord(view.record);
    },

    onSaveClick : function(button, event, options) {
        var horarioview = button.up('horarioview')
        var sotreHorariosSemanales = horarioview.down('#horariosemanal').getStore();
        var controller = this;
        var view =button.up('horariotoleranciaview');
        var myform = view.getForm();
        var record = view.record;
        var controller = this;
        
        if (view.profile < 2){
            notifyError('No posee derechos para la operación');
            return false;
        }
        
        if(record.get('Id') == 0) {
            //esto es por que se necesita que se creee en base
            record.save({callback:function () {
                controller.saveSegundaParte(record,view,myform,sotreHorariosSemanales,horarioview)
            }})
        } else {
            controller.saveSegundaParte(record,view,myform,sotreHorariosSemanales,horarioview)
        }
	}, // cierro saveobject
    
    
    saveSegundaParte: function (record,view,myform,sotreHorariosSemanales,horarioview) {
        var rmodel = this.getHorarioToleranciaModelModel();
        var controller = this;
        
        var id =  record.get('Id')
        if(id == 0) {
            id = record.get('tol_iidcuenta')
            //esto es un remache por que el rest no estaba devolviendo en el POST el ID
            record.set('Id',record.get('tol_iidcuenta'))
        }
        // cargo el record del model, cambiar el proxy no sirve por diferencia entre formatos de fecha de search y de /rest
        var recordSave = rmodel.load(id, {callback:function(_record){
                myform.updateRecord(_record);
    
                var isValidate = true;
                /// evaluo
                sotreHorariosSemanales.each(function(horario)  
                {  
                    // manejo los horarios
                    var tiempoApertura = myform.findField('tiempoApertura');
                    var tiempoCierre = myform.findField('tiempoCierre');
                    var diaApertura = myform.findField('diaApertura');
                    var diaCierre = myform.findField('diaCierre');
                    
                    var valores = {
                        tiempoApertura: horario.get('hor_choraapertura'),
                        tiempoCierre: horario.get('hor_choracierre'),
                        diaApertura: horario.get('hor_ndiaapertura'),
                        diaCierre: horario.get('hor_ndiacierre')
                    };
                    
                   if(!controller.validateHorario(horarioview,valores, horario)) {
                       isValidate = false;
                   }
                          
                },this);
                
                // valido los campos del formulario
                if (!horarioview.down('horariotoleranciaview').getForm().isValid()){
                    isValidate = false;
                    notifyError('Revise los valores del formulario');
                }

                if(_record.get('tol_dVacacionesDesde') == '' || !_record.get('tol_dVacacionesDesde') || _record.get('tol_dVacacionesDesde')<= new Date ('01/01/1970')) {
                      _record.set('tol_dVacacionesDesde',new Date('01/01/1900')) 
                }
                
                if(_record.get('tol_dVacacionesHasta') == '' || !_record.get('tol_dVacacionesHasta') || _record.get('tol_dVacacionesHasta')<= new Date ('01/01/1970')) {
                      _record.set('tol_dVacacionesHasta',new Date('01/01/1900')) 
                }

                if(isValidate) {
                    _record.save({
            			failure : function(r, operation) {
                            if (operation.error.status != 404){
                                controller.createRecord(view);
                            }else{
                    			console.log(arguments);
                            }    
            			},// cierro function
            			success : function(r, operation) {
                            var controller = operation.controller;
                            notify('Los cambios se guardaron con éxito');
                            record = r;
                            view.record = r;
            			}// cierro function
            		});// cierro save
                }
            }
        });
    },

    validateHorario: function(view,values, record){
        var valid = true;
        var store = record.store;
        
        // tengo en cuetna horarios de tolerancia
        /*var tolerancia = view.down('horariotoleranciaview').getRecord();
        var cierreDespues = tolerancia.get('tol_ncierredespues');
        var aperturaAntes = tolerancia.get('tol_naperturaantes');*/
        

        var cierreDespues = parseInt(view.down('#tol_ncierredespues').getValue());
        var aperturaAntes = parseInt(view.down('#tol_naperturaantes').getValue());

        
        // el horario de apertura - la tolerancia de apertura antes no puede pasar de dia
        var apertura = values.tiempoApertura.split(':');
        if (apertura[0] == "00" && (parseInt(apertura[1]) - aperturaAntes) < 0){
            Ext.Msg.show({
                 title:getLocale('Error!'),
                 msg: getLocale('El horario de apertura y su tolerancia pasan al día anterior!'),
                 icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        
        var cierre = values.tiempoCierre.split(':');
        
        if (cierre[0] == "23" && (parseInt(cierre[1]) + cierreDespues) >= 60){
            Ext.Msg.show({
                 title:getLocale('Error!'),
                 msg: getLocale('El horario de cierre y su tolerancia pasan al día posterior!'),
                 icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }

        
        // modifico para medir "distancia entre dias", pedido por GASPAR, acordado con Pablo Canonico 29/04/2020
        var cantDias = 0;
        // me fijo si el dia de cierre es menor al de apertura 
        if ((values.diaCierre - values.diaApertura)>=0){
            cantDias = values.diaCierre - values.diaApertura;
        } else {
            cantDias = (7-values.diaApertura)+values.diaCierre;
        }

        if (cantDias>6){
            Ext.Msg.show({
                    title:getLocale('Error!'),
                    msg: getLocale('El dia de cierre no puede ser anterior al de apertura!'),
                    icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        
        // hora apertura menor que hora cierre si es mismo dia (hay que mejorar la comparacion de texto no siempre funciona)
        if (values.diaCierre == values.diaApertura && values.tiempoCierre < values.tiempoApertura){
            Ext.Msg.show({
                 title:getLocale('Error!'),
                 msg: getLocale('El horario de cierre no puede ser anterior al de apertura!'),
                 icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        
        // interseccion con los otros registros
        store.each(function(item){
            // no tomo en cuenta el registro que estoy editando
            if (record != item){

                var fechApertura = parseInt((values.diaApertura.toString()+''+values.tiempoApertura.toString()).replace(':',''))
                var fechCierre = parseInt((values.diaCierre.toString()+''+values.tiempoCierre.toString()).replace(':',''))

                var fechAperturaIti = parseInt((item.get('hor_ndiaapertura').toString()+''+item.get('hor_choraapertura').toString()).replace(':',''))
                var fechCierreIti = parseInt((item.get('hor_ndiacierre').toString()+''+item.get('hor_choracierre').toString()).replace(':',''))

                console.log(fechApertura,fechCierre,fechAperturaIti,fechCierreIti)
                //detecto colicion
                if (fechAperturaIti <= fechCierre && fechCierreIti >= fechApertura ){
                    Ext.Msg.show({
                         title:getLocale('Error!'),
                         msg: getLocale('El horario se solapa con otros horarios!'),
                         icon: Ext.Msg.ERROR
                    });
                    valid = false
                    return false;
                }
            }
        });
        
        return valid
    }
});