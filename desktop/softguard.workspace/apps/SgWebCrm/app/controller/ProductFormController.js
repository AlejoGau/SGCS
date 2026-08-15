Ext.define('SGWebCrm.controller.ProductFormController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['RelationSearchModel', 'ProductModel', 'AttachModel', 'HighlightModel'],
    views: ['ContentDescriptionFormView', 'ContentLargeCommentView', 'ProductFormView'],

    init: function (config) {
        // genero los eventos

        this.control({
            'productformview': {
                afterrender: this.initview
            },
            'productformview button[action="save"]': {
                click: this.onSaveClick
            },
            'contentdescriptionformview button[action="save"]': {
                click: this.onSaveClick
            },
            'contentlargecommentview button[action="save"]': {
                click: this.onSaveClick
            },
            'productformview button[action="delete"]': {
                click: this.onDeleteClick
            },

            'productformview button[action="newAttach"]': {
                click: this.onNewAttachClick
            },

            'productformview button[action="newHighlight"]': {
                click: this.onNewHighlightClick
            },
            'productformview #structureList': {
                beforerender: this.loadStructureData
            }
        });
    },

    initview: function (view) {
        view.loadRecord(view.record);

        if (view.deleteHide) {
            view.down('#delete').hide()
        }

        if (view.rubrosDisabled) {
            view.down('#rubros').setDisabled(true)
        }
    },

    loadStructureData: function (view) {
        var store = this.getStructureStoreStore();
        view.bindStore(store);
    },

    onSaveClick: function (button, event, options) {
        var myform = button.up('form').getForm();
        var view = button.up('productformview');
        var mymodel = myform.getRecord();
        var record = mymodel;

        if (myform.isValid()) {
            myform.updateRecord(mymodel);

            var model = this.getProductModelModel();
            mymodel.setConfig({
                proxy: model.getProxy()
            });

            if (mymodel.data.Id != null) {
                var changes = {};
                Ext.Object.each(mymodel.modified, function (key) {
                    changes[key] = mymodel.get(key);
                });
                changes.Id = mymodel.get('Id');

                Ext.Ajax.request({
                    url: `/Rest/Product/${mymodel.data.Id}?_dc=${new Date().getTime()}`,
                    method: "PUT",
                    jsonData: changes,
                    scope: this,
                    success: function (response) {
                        notify("Los datos se guardaron con éxito");
                    },
                    failure: function (response) {
                        console.error('Error:', response.responseText);
                    }
                });
            }
            else {
                record.data.Id = 0;
                record.save({
                    scope: this,
                    callback: function (record, operation) {
                        notify('Los datos se guardaron correctamente');
                        view.fireEvent('objectchanged', record)
                    },
                    button: button
                });
            }


        } else {
            notify('Los nombres no pueden llevar coma');
        }

    },
    onDeleteClick: function (button, event, options) {
        var view = button.up('productformview');
        var record = view.record;
        var model = this.getProductModelModel();

        model.load(view.record.get('Id'), {
            callback: function (rec, operation, success) {
                if (rec) {
                    rec.erase({
                        callback: function (record, operation, success) {
                            var center = view.up('tabpanel');
                            if (center) {
                                center.getActiveTab().close();

                                var paging = center.down('productgridview').down('pagingtoolbar');
                                paging.moveFirst();
                                paging.doRefresh();
                            }
                        }
                    });

                }
            }
        });

        //record.setProxy(model.getProxy());
        /*record.setConfig({
            proxy: model.getProxy()
        });
        record.destroy({callback: function(){
            var center = view.up('tabpanel');
            if (center){
                center.getActiveTab().close();
            
                var paging = center.down('productgridview').down('pagingtoolbar');
                paging.moveFirst();
                paging.doRefresh();
            }
        }});*/
    },

    onNewHighlightClick: function (button, event, options) {
        var panel = button.up('tabpanel');
        var controller = this;
        var view = button.up('productformview');
        var container = view.up('productview');
        var record = view.record;
        var content = record;
        var parentId = record.get('Id');
        var targetTab = container.targetTab ? container.targetTab : Ext.getCmp('center');
        var section = container.section;

        if (section) {
            this.createHighlight(content, section.get('Id'), targetTab);
        } else {
            var win = Ext.widget('window', {
                title: 'Seleccione la sección',
                width: 300,
                height: 400,
                layout: 'fit',
                tbar: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Sitio',
                        labelWidth: 53,
                        store: 'SiteStore',
                        queryMode: 'remote',
                        displayField: 'Name',
                        forceSelection: true,
                        itemId: 'sitelist',
                        valueField: 'Id',
                        listeners: {
                            select: function (combo, records) {
                                var record = records[0];
                                var relationsTree = Ext.widget('treepanel', {
                                    preventHeader: true,
                                    targetTab: targetTab,
                                    record: record,
                                    listeners: {
                                        select: function (tree, record, index) {
                                            var sectionId = record.get('ObjectId');
                                            controller.createHighlight(content, sectionId, targetTab);
                                            win.close();
                                        }
                                    },
                                    store: {
                                        model: controller.getRelationSearchModelModel(),
                                        folderSort: true,
                                        sorters: [
                                            {
                                                property: 'ObjectName',//ObjectName
                                                direction: 'ASC'
                                            }
                                        ],
                                        root: {
                                            text: record.get('Name'),
                                            id: record.get('Id'),
                                            expanded: true,
                                            ObjectId: record.get('Id'),
                                            ObjectTypeName: 'Site'
                                        }
                                    }
                                });
                                win.add(relationsTree);
                            }
                        }
                    }
                ],
                items: [

                ],
                autoShow: true
            })

        }


    },

    createHighlight: function (content, sectionId, targetTab) {
        var model = this.getHighlightModelModel();
        var proxy = model.getProxy();
        var oldUrl = proxy.url;
        var url = '/Rest/section/' + sectionId + '/Highlight';
        var controller = this;

        proxy.url = url;
        var object = Ext.create(model, {
            Name: content.get('Name'),
            ObjectTypeId: content.get('ObjectTypeId'),
            SmallComment: content.get('SmallComment'),
            LargeComment: content.get('LargeComment'),
            ObjectId: content.get('Id'),
            DateStart: new Date(),
            DateEnd: new Date(Ext.Date.add(new Date(), Ext.Date.Day, 1))
        });

        object.save({
            callback: function (record, operation) {
                proxy.url = oldUrl;
                if (operation.success)
                    var newTab = Ext.widget('highlightview', {
                        iconCls: 'icon-Highlight',
                        title: record.get('Name'),
                        border: false,
                        closable: true,
                        sectionId: sectionId,
                        record: record,
                        objectId: record.get('Id'),
                        targetTab: targetTab,
                        autoDestroy: true
                    });

                targetTab.add(newTab);
                targetTab.setActiveTab(newTab);
            }
        });

    },

    onNewAttachClick: function (button, event, options) {
        var panel = button.up('tabpanel');

        var view = button.up('productformview');
        var record = view.record;
        var parentId = record.get('Id');

        var model = this.getAttachModelModel();
        var proxy = model.getProxy();
        var oldUrl = proxy.url;
        var url = '/Rest/product/' + parentId + '/Attach';
        var me = this;

        proxy.url = url;
        var attach = Ext.create(model, {
            Name: 'Nuevo Archivo'
        });

        attach.save({
            callback: function (record, operation) {
                proxy.url = oldUrl;
                me.openObjectTab(panel, record.get('Id'), 'Attach', record.get('Name'));
            }
        });

    },


    openObjectTab: function (tabpanel, objectId, objectTypeName, title) {
        var container = objectTypeName.toLowerCase() + 'view';

        var newTab = tabpanel.down('[title="' + title + '"]');
        if (!newTab) {
            var newTab = Ext.widget(container, {
                title: title,
                border: false,
                closable: true,
                objectId: objectId,
                targetTab: tabpanel,
                autoDestroy: true
            });

            tabpanel.add(newTab);
        }

        tabpanel.setActiveTab(newTab);
    },

    openObjectIframe: function (objectId, objectTypeName, title) {
        var center = window.parent.Ext.getCmp('center');
        if (center) {
            var url = '/a/' + objectTypeName + '?objectId=' + objectId;
            var newTab = Ext.create('Ext.ux.IFrame', {
                title: title,
                border: false,
                src: url,
                closable: true,
                autoDestroy: true
            });

            center.add(newTab);
            center.setActiveTab(newTab);
        }

    }
});