Ext.define('Ext.ux.upload.Model', {
    extend: 'Ext.data.Model',
    fields: ['id',
            'loaded',
            'name',
            'size',
            'percent',
            'status',
            'msg']
});
 


Ext.define('Common.view.UploadButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.uploadbutton',
    disabled: true,
    
    constructor: function(config)
    {
        var me = this;
        config = config || {};
        Ext.applyIf(config.uploader, {
            browse_button: config.id || Ext.id(me)
        });
        me.callParent([config]);
    },
    
    initComponent: function()
    {
        var me = this,
            e;
        me.callParent();
        me.uploader = me.createUploader();
        
        if(me.uploader.drop_element && (e = Ext.getCmp(me.uploader.drop_element)))
        {
            e.addListener('afterRender', function()
                {
                       me.uploader.initialize();
                },
                {
                    single: true,
                    scope: me
                });
        }
        else
        {
            me.addListener('afterRender', function()
                {
                       me.uploader.initialize();
                },
                {
                    single: true,
                    scope: me
                });
        }
        
        me.relayEvents(me.uploader, ['beforestart',
                'uploadready',
                'uploadstarted',
                'uploadcomplete',
                'uploaderror',
                'filesadded',
                'beforeupload',
                'fileuploaded',
                'updateprogress',
                'uploadprogress',
                'storeempty']);
    },
    
    createUploader: function()
    {
        return Ext.create('Common.view.UploadBasic', this, Ext.applyIf({
            listeners: {}
        }, this.initialConfig));
    }
});
Ext.define('Common.view.UploadBasic', {
    extend: 'Ext.util.Observable',
    autoStart: true,
    autoRemoveUploaded: true,
    
    statusQueuedText: 'Listo para subir',
    statusUploadingText: 'Subiendo ({0}%)',
    statusFailedText: 'Error',
    statusDoneText: 'Completo',
    statusInvalidSizeText: 'Archivo demasiado largo',
    statusInvalidExtensionText: 'Formato inválido',
    
    configs: {
        uploader: {
            runtimes: '',
            url: '',
            browse_button: null,
            container: null,
            max_file_size: '128mb',
            resize: '',
            flash_swf_url: '',
            silverlight_xap_url: '',
            filters: [],
            chunk_size: null,
            unique_names: true,
            multipart: true,
            multipart_params: {},
            multi_selection: true,
            drop_element: null,
            required_features: null
        }
    },
    
    constructor: function(owner, config)
    {
        var me = this;
        me.owner = owner;
        me.success = [];
        me.failed = [];
        Ext.apply(me, config.listeners);
        me.uploaderConfig = Ext.apply(me, config.uploader, me.configs.uploader);

       
        

       me.store = Ext.create('Ext.data.JsonStore', {
            model: 'Ext.ux.upload.Model',
            listeners: {
                load: me.onStoreLoad,
                remove: me.onStoreRemove,
                update: me.onStoreUpdate,
                scope: me
            }
        });
        
        me.actions = {
            
            textStatus: Ext.create('Ext.Action', {
                text: '<i>' + getLocale('uploader not initialized')+'</i>'
            }),
            add: Ext.create('Ext.Action', {
                text: config.addButtonText || getLocale('Add files'),
                iconCls: config.addButtonCls,
                disabled: false
            }),
            start: Ext.create('Ext.Action', {
                text: config.uploadButtonText || getLocale('Conenzar'),
                disabled: true,
                iconCls: config.uploadButtonCls,
                handler: me.start,
                scope: me
            }),
            cancel: Ext.create('Ext.Action', {
                text: config.cancelButtonText || getLocale('Cancelar'),
                disabled: true,
                iconCls: config.cancelButtonCls,
                handler: me.cancel,
                scope: me
            }),
            removeUploaded: Ext.create('Ext.Action', {
                text: config.deleteUploadedText || getLocale('Borrar subidos'),
                disabled: true,
                handler: me.removeUploaded,
                scope: me
            }),
            removeAll: Ext.create('Ext.Action', {
                text: config.deleteAllText || getLocale('Borrar todos'),
                disabled: true,
                handler: me.removeAll,
                scope: me
            })
        };
        me.callParent();
    },
    
    initialize: function()
    {
        var me = this;
        if(!me.initialized)
        {
            me.initialized = true;
            me.initializeUploader();
        }
    },
    destroy: function()
    {
        this.clearListeners();
    },
    
    setUploadPath: function(path)
    {
        this.uploadpath = path;
    },
    
    removeAll: function()
    {
        this.store.data.each(function(record)
        {
            this.removeFile(record.get('id'));
        }, this);
    },
    
    removeUploaded: function()
    {
        //console.log(this.store);
        this.store.each(function(record)
        {
            //console.log(record);
            if(record && record.get('status') == 5)
            {
                this.removeFile(record.get('id'));
            }
        }, this);
    },
    
    removeFile: function(id)
    {
        var me = this,
            file = me.uploader.getFile(id);
        
        if(file)
            me.uploader.removeFile(file);
        else
            me.store.remove(me.store.getById(id));
    },
    
    cancel: function()
    {
        var me = this;
        me.uploader.stop();
        me.actions.start.setDisabled(me.store.data.length == 0);
    },
    
    start: function()
    {
        var me = this;
        me.fireEvent('beforestart', me);
        if(me.multipart_params)
        {
            me.uploader.settings.multipart_params = me.multipart_params;
        }
        me.uploader.start();
        //console.log(me.uploader);
    },
    
    initializeUploader: function()
    {
        var me = this;
        if (!me.uploaderConfig.runtimes) {
            var runtimes = ['html5'];
            
            me.uploaderConfig.flash_swf_url && runtimes.push('flash');
            me.uploaderConfig.silverlight_xap_url && runtimes.push('silverlight');
            runtimes.push('html4');
            me.uploaderConfig.runtimes = runtimes.join(',');
        }
        me.uploader = Ext.create('plupload.Uploader', {
            url: me.url,
            runtimes: me.runtimes || runtimes,
            browse_button: me.browse_button || null,
            // container: this.getTopToolbar().getEl().dom.id,
            max_file_size: me.maxFileSize || '10mb',
            resize: me.resize || '',
            flash_swf_url: me.flash_swf_url || '',
            silverlight_xap_url: me.silverlight_xap_url || '',
            java_applet_url: me.java_applet_url || '',
            filters: me.filters || [],
            chunk_size: me.chunk_size,
            unique_names: me.unique_names || true,
            multipart: me.multipart || true,
            multipart_params: me.multipart_params || {},
            drop_element: me.dropElement || null,
            required_features: me.required_features
        });
        
        Ext.each(['Init',
                'ChunkUploaded',
                'FilesAdded',
                'FilesRemoved',
                'FileUploaded',
                'PostInit',
                'QueueChanged',
                'Refresh',
                'StateChanged',
                'BeforeUpload',
                'UploadFile',
                'UploadProgress',
                'Error'], function(v){
                    me.uploader.bind(v, eval("me._" + v), me);
                }, me);
        
        me.uploader.init();
    },
    
    updateProgress: function()
    {
        var me = this,
            t = me.uploader.total,
            speed = Ext.util.Format.fileSize(t.bytesPerSec),
            total = me.store.data.length,
            failed = me.failed.length,
            success = me.success.length,
            sent = failed + success,
            queued = total - success - failed,
            percent = t.percent;
        
        me.fireEvent('updateprogress', me, total, percent, sent, success, failed, queued, speed);
    },
    
    updateStore: function(v)
    {
        var me = this,
            data = me.store.getById(v.id);
        
        if(!v.msg)
        {
            v.msg = '';
        }
        if(data)
        {
            data.data = v;
            data.commit();
        }
        else
        {
            me.store.loadData([v], true);
        }
    },
    
    onStoreLoad: function(store, record, operation)
    {
        this.updateProgress();
    },
    
    onStoreRemove: function(store, record, operation)
    {
        var me = this;
        if(!store.data.length)
        {
            me.actions.start.setDisabled(true);
            me.actions.removeUploaded.setDisabled(true);
            me.actions.removeAll.setDisabled(true);
            me.uploader.total.reset();
            me.fireEvent('storeempty', me);
        }
        
        var id = record[0].get('id');
        Ext.each(me.success, function(v)
        {
            if(v && v.id == id)
                Ext.Array.remove(me.success, v);
        }, me);
        
        Ext.each(me.failed, function(v)
        {
            if(v && v.id == id)
                Ext.Array.remove(me.failed, v);
        }, me);
        
        me.updateProgress();
    },
    
    onStoreUpdate: function(store, record, operation)
    {
        record.data = this.fileMsg(record.data);
        this.updateProgress();
    },
    
    fileMsg: function(file)
    {
        var me = this;
        if(file.status && file.server_error != 1)
        {
            switch(file.status)
            {
                case 1:
                    file.msg = me.statusQueuedText;
                    break;
                case 2:
                    file.msg = Ext.String.format(me.statusUploadingText, file.percent);
                    break;
                case 4:
                    file.msg = file.msg || me.statusFailedText;
                    break;
                case 5:
                    file.msg = me.statusDoneText;
                    break;
            }
        }
        return file;
    },
    
    _Init: function(uploader, data)
    {
        this.runtime = data.runtime;
        this.owner.enable(true); // button aktiv schalten
        this.fireEvent('uploadready', this);
    },
    
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    _BeforeUpload: function(uploader, file)
    {
        this.fireEvent('beforeupload', this, uploader, file);
    },
    
    _ChunkUploaded: function()
    {
    },
    
    _FilesAdded: function(uploader, files)
    {
        var me = this;
        
        if(me.uploaderConfig.multi_selection != true) 
        {
            if(me.store.data.length == 1)
            //if(uploader.files.length == 1)
                return false;
            
            files = [files[0]];
            uploader.files = [files[0]];  
        }   
         
        me.actions.removeUploaded.setDisabled(false);
        me.actions.removeAll.setDisabled(false);
        me.actions.start.setDisabled(uploader.state == 2);
        Ext.each(files, function(v)
        {
            me.updateStore(v);
            
        }, me);
        if(me.fireEvent('filesadded', me, files) !== false)
        {
            if(me.autoStart && uploader.state != 2)
                Ext.defer(function()
                {
                    me.start();
                }, 300);
        }
    },
    
    _FilesRemoved: function(uploader, files)
    {
        Ext.each(files, function(file)
        {
            this.store.remove(this.store.getById(file.id));
        }, this);
    },
    
    _FileUploaded: function(uploader, file, status)
    {
        var me = this,
            response = Ext.JSON.decode(status.response);
        
        if(response.success == true || response.length > 0)
        {
            file.server_error = 0;
            me.success.push(file);
            me.fireEvent('fileuploaded', me, file);
        }
        else
        {
            if(response.message)
            {
                file.msg = '<span style="color: red">' + response.message + '</span>';
            }
            file.server_error = 1;
            me.failed.push(file);
            me.fireEvent('uploaderror', me, Ext.apply(status, {
                file: file
            }));
        }
        this.updateStore(file);
    },
    
    _PostInit: function(uploader)
    {
    },
    
    _QueueChanged: function(uploader)
    {
    },
    
    _Refresh: function(uploader)
    {
        Ext.each(uploader.files, function(v)
        {
            this.updateStore(v);
        }, this);
    },
    
    _StateChanged: function(uploader)
    {
        if(uploader.state == 2)
        {
            this.fireEvent('uploadstarted', this);
            this.actions.cancel.setDisabled(false);
            this.actions.start.setDisabled(true);
        }
        else
        {
            this.fireEvent('uploadcomplete', this, this.success, this.failed);
            if(this.autoRemoveUploaded)
                this.removeUploaded();
            this.actions.cancel.setDisabled(true);
            this.actions.start.setDisabled(this.store.data.length == 0);
        }
    },
    
    _UploadFile: function(uploader, file)
    {
    },
    
    _UploadProgress: function(uploader, file)
    {
        var me = this,
            name = file.name,
            size = file.size,
            percent = file.percent; 
    
        me.fireEvent('uploadprogress', me, file, name, size, percent);
        if(file.server_error)
            file.status = 4;
        
        me.updateStore(file);
    },
    
    _Error: function(uploader, data)
    {
        if(data.file)
        {
            data.file.status = 4;
            if(data.code == -600)
            {
                data.file.msg = Ext.String.format('<span style="color: red">{0}</span>', this.statusInvalidSizeText);
            }
            else if(data.code == -700)
            {
                data.file.msg = Ext.String.format('<span style="color: red">{0}</span>', this.statusInvalidExtensionText);
            }
            else
            {
                data.file.msg = Ext.String.format('<span style="color: red">{2} ({0}: {1})</span>', data.code, data.details,
                        data.message);
            }
            this.failed.push(data.file);
            this.updateStore(data.file);
        }
        this.fireEvent('uploaderror', this, data);
    }
});
Ext.define('Common.view.UploadPluginWindow', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.uploadwindow',
    requires: [ 'Ext.ux.statusbar.StatusBar',
                'Ext.ux.statusbar.ValidationStatus' ],
            
    constructor: function(config)
    {
        var me = this;
        Ext.apply(me, config);
        me.callParent(arguments);
    },
    
    init: function(cmp)
    {
        var me = this,
            uploader = cmp.uploader;
        
        cmp.on({
            filesadded: {
                fn: function(uploader, files)
                {
                    me.window.show();
                    uploader.start();
                },
                scope: me
            },
            updateprogress: {
                fn: function(uploader, total, percent, sent, success, failed, queued, speed)
                {
                    var t = Ext.String.format(getLocale('Subido')+' {0}% ({1} '+getLocale('of')+' {2})', percent, sent, total);
                    me.statusbar.showBusy({
                        text: t,
                        clear: false
                    });
                },
                scope: me
            },
            uploadprogress: {
                fn: function(uploader, file, name, size, percent)
                {
                    // me.statusbar.setText(name + ' ' + percent + '%');
                },
                scope: me
            },
            uploadcomplete: {
                fn: function(uploader, success, failed)
                {
                    if(failed.length == 0)
                        me.window.hide();
                },
                scope: me
            }
        });
        
        me.statusbar = new Ext.ux.StatusBar({
            dock: 'bottom',
            //id: 'form-statusbarUpBtn',
            defaultText: 'Ready'
        });
        
        me.view = new Ext.grid.Panel({
            store: uploader.store,
            stateful: true,
            hideHeaders: true,
            stateId: 'stateGrid',
            columns: [{
                text: 'Name',
                flex: 1,
                sortable: false,
                dataIndex: 'name'
            },
                    {
                        text: 'Size',
                        width: 90,
                        sortable: true,
                        align: 'right',
                        renderer: Ext.util.Format.fileSize,
                        dataIndex: 'size'
                    },
                    {
                        text: 'Change',
                        width: 75,
                        sortable: true,
                        hidden: true,
                        dataIndex: 'percent'
                    },
                    {
                        text: 'status',
                        width: 75,
                        hidden: true,
                        sortable: true,
                        dataIndex: 'status'
                    },
                    {
                        text: 'msg',
                        width: 175,
                        sortable: true,
                        dataIndex: 'msg'
                    }],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false
            },
            dockedItems: [{
                dock: 'top',
                enableOverflow: true,
                xtype: 'toolbar',
                style: {
                    background: 'transparent',
                    border: 'none',
                    padding: '5px 0'
                },
                listeners: {
                    beforerender: function(toolbar)
                    {
                        if(uploader.autoStart == false)
                            toolbar.add(uploader.actions.start);
                        toolbar.add(uploader.actions.cancel);
                        toolbar.add(uploader.actions.removeAll);
                        if(uploader.autoRemoveUploaded == false)
                            toolbar.add(uploader.actions.removeUploaded);
                    },
                    scope: me
                }
            },
                    me.statusbar]
        });
        
        me.window = new Ext.Window({
            title: me.title || 'Upload files',
            width: me.width || 640,
            height: me.height || 380,
            // modal : true, // harry
            plain: true,
            constrain: true,
            border: false,
            layout: 'fit',
            items: me.view,
            closeAction: 'hide',
            listeners: {
                hide: function(window)
                {
                    /*
                     * if(this.clearOnClose) { this.uploadpanel.onDeleteAll(); }
                     */
                },
                scope: this
            }
        });
    }
});
