Ext.define('Common.controller.ModuleTreeWRGuiadoController',{
    extend: 'Ext.app.Controller',

    views: [
        'ModuleTreeWRGuiadoView'
    ],

    refs: [
        {
            ref: 'moduleTreeWRGuiadoView',
            selector: 'moduletreewrguiadoview'
        }
    ],

    init: function () {
        this.control({
            'moduletreewrguiadoview': {
                updatestep: this.onUpdateStep,
                afterrender: this.initView,
                showtextoguiado: this.onShowTextoGuiado,   
                fireeventoenatencionview: this.onFireEventoEnAtencionView,
                saveobs: this.onSaveObs,
                itemclick: function(view, record, item, index, e) {
                    return false;
                },
                itemmouseenter: this.onMouseEnter,
                cellclick: this.onCellClick,
                itemdblclick: this.onItemdblclick

            }
        });
    },

    onUpdateStep: function(view, record/*ojo record del tree */,cargoObservacion/* indica si el usuario cargó la observación del step */,indicaNoRealizo){
        const nextRecNode = this.findNextNode(view.getStore(), record.getId());
        var controller = this;
        //if (e.getTarget('.circle-indicator') && record.get('color') === BLUE) {
            //Ext.Msg.alert('Clicked', 'You clicked on: ' + record.get('text') + ' next record is: ' + nextRecNode.get('text'));
            if(cargoObservacion){
                record.set('color',ORANGE);
                record.set('styleCls', BACKGROUND_ORANGE);  // color background del actual step
            }else{
                record.set('color', GREEN);  // color del actual paso en el círculo de la tilde
                record.set('styleCls', BACKGROUND_GREEN);  // color background del actual step
            }
            if(indicaNoRealizo){
                record.set('color', RED);  // color del actual paso en el círculo de la tilde
                record.set('styleCls', BACKGROUND_RED);  // color background del actual step

            }
            if(nextRecNode){
                nextRecNode.set('color', BLUE); // color del siguiente paso en el círculo de la tilde
                nextRecNode.set('styleCls', BACKGROUND_BLUE); // color background del siguiente step
                this.onShowTextoGuiado(view, nextRecNode.get('textoGuiado'));
                this.onFireEventoEnAtencionView(view, nextRecNode);
                controller.onSaveObs(view,nextRecNode,1,'Inicio de ejecución del paso: '+nextRecNode.get('textoGuiado'));
            }else{
                view.up( 'eventomonitoreoguiadoview' ).down('#procesarButton').setDisabled(false);
                view.up( 'eventomonitoreoguiadoview' ).down('#procesomultipleButton').setDisabled(false);
                
            }

            //view.refresh();
        //}
    },

    onFireEventoEnAtencionView: function(view, recordNode){
        var controller = this;
        var atencionView = view.up('eventomonitoreoguiadoview').down('atencioneventoguiadoview');
        atencionView.fireEvent('runstep', atencionView, recordNode.get('codStep'));
        controller.onSaveObs(view,recordNode,1,'Inicio de ejecución del paso: '+recordNode.get('textoGuiado'));
    },

    onShowTextoGuiado: function(view, texto) {
        
        var textoGuiado = view.up('eventomonitoreoguiadoview').down('#textoGuiado');    
        if (textoGuiado) {
            textoGuiado.setValue(texto);
            
        } else {
            console.warn('No se encontró el campo textoGuiado en la vista.');   

        }
        
    },
    
    onSaveObs: function(view, recordNode, status,observacion){
        /*
        los valores de código de status son:
        1- Inicio de ejecución
        2- Confirmación SI/NO
        3- Confirma observación
        */
        
        var controller = this;
        Ext.Ajax.request({
            url: '/Rest/search/GuidedMonitoringStepsTimelineInsertSearch', // Replace with your API endpoint
            method: 'GET',
            params: {
                //view.indexStep+'] '+view.down('#observaciones').getValue()
                gst_iRecID: recordNode.get('recordEvento').get('rec_iid'),
                gst_iStepNumber: recordNode.get('recordTemplate').get('gms_iStepNumber'), 
                gst_iTemplateID: recordNode.get('recordTemplate').get('gms_iTemplateID'),
                gst_iStepID: recordNode.get('recordTemplate').get('gms_iStepID'),
                gst_cObs: observacion,
                gst_iStatus: status,
                gst_iOperador: _UserData.udw_idKey 

            },
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if (responseData.success) {
                    
                    if(view.itemId == 'monitoreoguiadocargarobsview'){
                        notify('Observaciones guardadas correctamente');
                        view.up('window').close();
                    }
                    //if(caller && caller.up('eventomonitoreoguiadoview'))
                    //    caller.up('eventomonitoreoguiadoview').close(); // Cierra la ventana principal de monitoreo guiado si existe                    
                } else {
                    
                    notifyError( 'No se pudieron guardar las observaciones.');
                }
            },
            failure: function() {
                
                notifyError( 'Error al comunicarse con el servidor.');
            }
        });
    },


    onCellClick: function(view, td, cellIndex, record /* ojo este record es del tree*/, tr, rowIndex, e) {
        var controller = this;
        if (e.getTarget('.circle-indicator') && record.get('color') === BLUE) {
                
                Ext.Msg.show({
                    title: getLocale('Confirmar Accion'),
                    msg: getLocale('¿La tarea fue ralizada?'),
                    buttons: Ext.Msg.YESNOCANCEL,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn) { 
                        var requiredObs = false;
                        if (btn === 'yes') {
                            controller.onSaveObs(view,record,2,'Usuario responde que SI realizó tarea')
                        }else if (btn === 'no') {
                            controller.onSaveObs(view,record,2,'Usuario responde que NO realizó tarea')
                            requiredObs = true;
                        }else if (btn === 'cancel') {
                            return false;
                        }
                        var win = Ext.widget('window', {

                           
                            modal: true,
                            width: 500,
                            height: 300,
                            closable: false,
                            resizable: false,
                            layout: 'fit',
                            items:[
                                {
                                    xtype: 'monitoreoguiadocargarobsview',  
                                    itemId: 'monitoreoguiadocargarobsview',    
                                    indicaNoRealizo: (btn === 'no'), //indica si el usuario hizo click en NO
                                    requiredObs: requiredObs, //luego indicar para qué sirve esta property
                                    indexStep: record.get('indexStep'), //indica el número de paso
                                    finalStep: record.get('finalStep'), //indica si es el último paso
                                    caller: view.up('moduletreewrguiadoview'),  //el caller será ModuleTreeWRGuiadoView
                                    recordNode: record,
                                    recordEvento: record.get('recordEvento'), //record del evento seleccionado
                                }

                            ],

                            listeners: {

                            }   
                        });
                        win.show();
                    }
                });
        }

                    /*const nextRecNode = this.findNextNode(view.getStore(), record.getId());
                    if (e.getTarget('.circle-indicator') && record.get('color') === BLUE) {
                        Ext.Msg.alert('Clicked', 'You clicked on: ' + record.get('text') + ' next record is: ' + nextRecNode.get('text'));
                        record.set('color', GREEN);  // color del actual paso en el círculo de la tilde
                        record.set('styleCls', 'wrg-tree-node-green');  // color background del actual step
                        nextRecNode.set('color', BLUE); // color del siguiente paso en el círculo de la tilde
                        nextRecNode.set('styleCls', 'wrg-tree-node-blue'); // color background del siguiente step

                        view.refresh();
                    }*/
    },

    onMouseEnter: function(view, record, item, index, e) {
                    const tipText = record.get('tooltip') || record.get('text');
                    Ext.fly(item).set({
                        'data-qtip': Ext.htmlEncode(tipText)
                    });
    },

    initView: function (view) {
           /* const view = tree.getView();
            var controller = this;

            view.on('itemmouseenter', function (view, record, item) {
                const tipText = record.get('tooltip') || record.get('text');
                Ext.fly(item).set({
                    'data-qtip': Ext.htmlEncode(tipText)
                });
            });


            view.on('cellclick', function (view, td, cellIndex, record, tr, rowIndex, e) {
                const nextRecNode = controller.findNextNode(view.getStore(),record.getId());
                if (e.getTarget('.circle-indicator') && record.get('color') == BLUE) {
                    Ext.Msg.alert('Clicked', 'You clicked on: ' + record.get('text')+ ' next record is: '+nextRecNode.get('text'));
                    record.set('color', GREEN);  // color del actual paso en el círculo de la tilde
                    record.set('styleCls', 'wrg-tree-node-green');  // color background del actual step
                    nextRecNode.set('color', BLUE); // color del siguiente paso en el círculo de la tilde
                    nextRecNode.set('styleCls', 'wrg-tree-node-blue'); // color background del siguiente step

                    view.refresh();
                }
            });*/
            view.listObservaciones=[];
            
    },
    findNextNode: function (store,recordId) {
        const currentRec = store.getNodeById(recordId);

        const flatList = [];
        store.getRoot().cascadeBy(function(node) {
            if (node.isLeaf()) {
                flatList.push(node);
            }
        });

        const index = flatList.indexOf(currentRec);
        const nextRec = (index !== -1 && index < flatList.length - 1) ? flatList[index + 1] : null;

        return nextRec;      
    },    

    onItemdblclick: function(view, record, item, index, e) {

        var atencionEventoGuiadoView = view.up('eventomonitoreoguiadoview').down('atencioneventoguiadoview');
        if(atencionEventoGuiadoView && record.get('color') != GREY /*&& record.get('color') != BLUE*/ ){
            atencionEventoGuiadoView.fireEvent('runstep', atencionEventoGuiadoView, record.get('codStep'));
            this.onSaveObs(view,record,1,'Inicio de ejecución del paso: '+record.get('textoGuiado'));
        }

    }
}


);