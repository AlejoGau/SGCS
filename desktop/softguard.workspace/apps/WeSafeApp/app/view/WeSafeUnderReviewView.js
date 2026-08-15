Ext.define('WeSafe.view.WeSafeUnderReviewView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.WeSafeUnderReviewView',
    title: 'En Revisión',
    layout: 'fit',
    height: 500,

    initComponent: function () {
        var store = Ext.create('WeSafe.store.WeSafeEventosInformadosStore', {
            autoLoad: true
        });

        var grid = Ext.create('Ext.grid.Panel', {
            itemId: 'publishingGrid',
            store: store,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI',
                checkOnly: true
            },
            flex: 1,
            viewConfig: {
                rowHeight: 25,
                stripeRows: true
            },
            columns: [
                { text: 'id', dataIndex: 'id', hidden: true },
                { text: 'Fecha y Hora', dataIndex: 'fechaHora', width: 160, sortable: true },
                { text: 'Descripción del evento', dataIndex: 'descripcionEvento', width: 280, sortable: true },
                {
                    text: 'Audio',
                    dataIndex: 'audio',
                    width: 80,
                    align: 'center',
                    renderer: function (value) {
                        return value === 1 ? '<span class="media-icon fa fa-volume-up" data-type="audio" style="font-size:13px; color:#007bff; cursor:pointer;" title="Escuchar Audio"></span>' : '';
                    },
                    sortable: true 
                },
                {
                    text: 'Video',
                    dataIndex: 'video',
                    width: 80,
                    align: 'center',
                    renderer: function (value) {
                        return value === 1 ? '<span class="media-icon fa fa-play-circle" data-type="video" style="font-size:13px; color:#007bff; cursor:pointer;" title="Ver Video"></span>' : '';
                    },
                    sortable: true 
                },
                {
                    text: 'Imagen',
                    dataIndex: 'imagen',
                    width: 80,
                    align: 'center',
                    renderer: function (value) {
                        return value === 1 ? '<span class="media-icon fa fa-image" data-type="imagen" style="font-size:13px; color:#007bff; cursor:pointer;" title="Ver Imagen"></span>' : '';
                    },
                    sortable: true 
                },
                {
                    text: 'Comentario del evento',
                    dataIndex: 'comentarioEvento',
                    flex: 2,
                    renderer: function (value) {
                        return `<span class="comment-view" style="cursor:pointer; text-decoration:underline; color:#007bff;" title="Ver comentario completo">${Ext.String.htmlEncode(value)}</span>`;
                    },
                    sortable: false 
                },
                { text: 'Usuario del evento', dataIndex: 'usuarioEvento', width: 150, sortable: true },
                { text: 'Cant. de reportes', dataIndex: 'cantReportes', width: 100, align: 'left', sortable: true },
                { text: 'Estado del evento', dataIndex: 'estadoEvento', width: 150, sortable: true }
            ],
            listeners: {
                sortchange: function (ct, column, direction) {
                    var grid = ct.up('grid'),  // Obtiene el grid desde el contenedor de columnas
                        store = grid.getStore();
                
                    if (column && direction) {
                        console.log(`Ordenando por: ${column.dataIndex} en dirección ${direction}`);
                        
                        store.getProxy().setExtraParams({  // ✅ Asegurar que se reemplazan los valores
                            sort: column.dataIndex,
                            dir: direction
                        });
                
                        store.loadPage(1);  // 🔄 Recargar desde la primera página
                    }
                }
            },
            viewConfig: {
                listeners: {
                    itemclick: function (view, record, item, index, e) {
                        var target = e.getTarget('.media-icon');
                        if (target) {
                            var id = record.get('id');
                            var type = target.getAttribute('data-type');
            
                            // 🔹 Verificar si ya existe la ventana multimedia antes de abrirla
                            var existingMediaWindow = Ext.ComponentQuery.query(`window[mediaId=${id}]`)[0];
                            if (existingMediaWindow) {
                                existingMediaWindow.toFront();
                                return;
                            }
            
                            var title = record.get('descripcionEvento') + " (Usuario: " + record.get('usuarioEvento') + ")";
                            var controller = WeSafe.app.getController('WeSafe.controller.WeSafeUnderReviewController');
                            controller.loadMultimedia(id, type, title);
                        }
            
                        var commentTarget = e.getTarget('.comment-view');
                        if (commentTarget) {
                            var commentId = `commentWindow-${record.get('id')}`;
            
                            // 🔹 Usar la misma validación que loadMultimedia para evitar duplicados
                            var existingCommentWindow = Ext.ComponentQuery.query(`window[commentId=${commentId}]`)[0];
                            if (existingCommentWindow) {
                                existingCommentWindow.toFront();
                                return;
                            }
            
                            var title = record.get('descripcionEvento') + " (Usuario: " + record.get('usuarioEvento') + ")";
            
                            Ext.create('Ext.window.Window', {
                                title: title,
                                width: 500,
                                height: 300,
                                modal: true,
                                layout: 'fit',
                                commentId: commentId, // 🔥 Asignamos un atributo único a la ventana
                                items: [
                                    {
                                        xtype: 'panel',
                                        padding: 10,
                                        html: `<div style="white-space:pre-wrap;">${Ext.String.htmlEncode(record.get('comentarioEvento'))}</div>`
                                    }
                                ]
                            }).show();
                        }
                    }
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Aprobado',
                            handler: function () {
                                var controller = WeSafe.app.getController('WeSafe.controller.WeSafeUnderReviewController');
                                controller.handleChangeEstado(this, 0);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Denegado',
                            handler: function () {
                                var controller = WeSafe.app.getController('WeSafe.controller.WeSafeUnderReviewController');
                                controller.handleChangeEstado(this, 2);
                            }
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: Ext.data.StoreManager.lookup('WeSafeEventosInformadosStore'),
                    dock: 'bottom',
                    displayInfo: true,
                    listeners: {
                        beforechange: function (pagingToolbar, page) {
                            var estado = "Revision";

                            var store = pagingToolbar.getStore();
                            store.getProxy().setExtraParam('estado', estado);
                        }
                    }
                }
            ]
        });

        this.items = [grid];

        this.callParent(arguments);
    }
});