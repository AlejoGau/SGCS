Ext.define('SmartTrack.view.DateTimeField', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.datetimefield',
    //requires: ['SmartTrack.view.DateTimePicker'],

    format: "d/m/Y H:i",

    altFormats: "d/m/Y H:i:s|c",
    width: 270,

    mimicBlur: function(e) {
        var me = this,
            picker = me.picker;

        // ignore mousedown events within the picker element
        if (!picker || !e.within(picker.el, false, true) && !e.within(picker.timePicker.el, false, true)) {
            me.callParent(arguments);
        }
    },

    triggerBlur: function() {
        return false;
    },

    collapseIf: function(e) {
        var me = this,
            picker = me.picker;

        if (picker.timePicker && !e.within(picker.timePicker.el, false, true)) {
            me.callParent([e]);
        }
    },
    

    createPicker: function() {
        var me = this,
            parentPicker = this.callParent(),
            config = Ext.merge(me.initialConfig, parentPicker.initialConfig);

            if (config.renderTo) {
                delete config.renderTo;
            }
        
        return Ext.create('SmartTrack.view.DateTimePicker', config);
    },

    getErrors: function(value) {
        value = arguments.length > 0 ? value : this.formatDate(this.processRawValue(this.getRawValue()));

        var me = this,
            format = Ext.String.format,
            errors = me.superclass.superclass.getErrors.apply(this, arguments),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue,
            fvalue,
            day,
            time;

        if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        svalue = value;
        value = me.parseDate(value);
        if (!value) {
            errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
            return errors;
        }

        time = value.getTime();
        if (minValue && time < minValue.getTime()) {
            errors.push(format(me.minText, me.formatDate(minValue)));
        }

        if (maxValue && time > maxValue.getTime()) {
            errors.push(format(me.maxText, me.formatDate(maxValue)));
        }

        if (disabledDays) {
            day = value.getDay();

            for(; i < len; i++) {
                if (day === disabledDays[i]) {
                    errors.push(me.disabledDaysText);
                    break;
                }
            }
        }

        fvalue = me.formatDate(value);
        if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
            errors.push(format(me.disabledDatesText, fvalue));
        }

        return errors;
    }
    
});

Ext.define('SmartTrack.view.DateTimePicker', {
    extend: 'Ext.picker.Date',
    alias: 'widget.datetimepicker',
    
    todayText: 'Hoy',
    
    hourText: 'Hora',

    minuteText : 'Minutos',

    initEvents: function() {
        var me = this,
            eDate = Ext.Date,
            day = eDate.DAY;

        Ext.apply(me.keyNavConfig,{
            up: function(e) {
                if (e.ctrlKey) {
                    if (e.shiftKey) {
                        me.minuteSlider.setValue(me.minuteSlider.getValue() + 1);
                    } else {
                        me.showNextYear();
                    }
                } else {
                    if (e.shiftKey) {
                        me.hourSlider.setValue(me.hourSlider.getValue() + 1);
                    } else {
                        me.update(eDate.add(me.activeDate, day, - 7));
                    }
                }
            },

            down: function(e) {
                if (e.ctrlKey) {
                    if (e.shiftKey) {
                        me.minuteSlider.setValue(me.minuteSlider.getValue() - 1);
                    } else {
                        me.showPrevYear();
                    }
                } else {
                    if (e.shiftKey) {
                        me.hourSlider.setValue(me.hourSlider.getValue() - 1);
                    } else {
                        me.update(eDate.add(me.activeDate, day, 7));
                    }
                }
            }
        });
        me.callParent();
    },

    initComponent: function() {
        var me = this,
            dtAux = me.value ? new Date(me.value) : new Date();

        dtAux.setSeconds(0);
        
        me.timeFormat = me.format.indexOf("h") !== -1 ? 'h' : 'H';
        me.hourSlider = new Ext.slider.Single({
            fieldLabel: me.hourText,
            labelAlign: 'top',
            labelSeparator: ' ',
            padding: '0 0 10 17',
            focusable : false,
            value: 0,
            minValue: 0,
            maxValue: 23,
            vertical: true,
            listeners: {
                change: me.changeTimeValue,
                scope: me
            }
        });

        me.minuteSlider = new Ext.slider.Single({
            fieldLabel: me.minuteText,
            labelAlign: 'top',
            labelSeparator: ' ',
            padding: '0 10 10 0',
            focusable : false,
            value: 0,
            increment: 1,
            minValue: 0,
            maxValue: 59,
            vertical: true,
            listeners: {
                change: me.changeTimeValue,
                scope: me
            }
        });
        
        me.callParent();
        me.setValue(new Date(dtAux));
    },

    afterRender: function() {
        var me = this;

        me.timePicker = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            border: false,
            defaults: {
                flex: 1
            },
            width: 130,
            floating: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                ui: 'footer',
                items: [
                    '->', {
                        xtype: 'label',
                        text: me.timeFormat == 'h' ? '12:00 AM' : '00:00'
                    },
                    '->'
                ]
            }],
            items: [me.hourSlider, me.minuteSlider],
            onMouseDown: function(e) {
                e.preventDefault();
            },
        });

        me.callParent();
    },

    handleTabClick: function (e) {
        this.handleDateClick(e, this.activeCell.firstChild, true);
    },

    getSelectedDate: function (date) {
        var me = this,
            t = Ext.Date.clearTime(date,true).getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            cLen = cellItems.length,
            cell, c;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = cellItems[c].firstChild;
            if (cell.dateValue === t) {
                return cell;
            }
        }
        return null;
    },

    changeTimeValue: function(slider, e, eOpts) {
        var me = this,
            label = me.timePicker.down('label'),
            minutePrefix = me.minuteSlider.getValue() < 10 ? '0' : '',
            hourDisplay = me.hourSlider.getValue(),
            pickerValue, hourValue, minuteValue, hourPrefix, timeSufix, auxValue;

        if (me.timeFormat == 'h') {
            timeSufix = me.hourSlider.getValue() < 12 ? ' AM' : ' PM';
            hourDisplay = me.hourSlider.getValue() < 13 ? hourDisplay : hourDisplay - 12;
            hourDisplay = hourDisplay || '12';
        }

        hourPrefix = hourDisplay < 10 ? '0' : '';

        label.setText(hourPrefix + hourDisplay + ':' + minutePrefix + me.minuteSlider.getValue() + (timeSufix || ''));

        if (me.pickerField && (pickerValue = me.pickerField.getValue())) {
            hourValue = me.hourSlider.getValue();
            minuteValue = me.minuteSlider.getValue();
            auxValue = new Date(pickerValue.setHours(hourValue, minuteValue));

            me.pickerField.setValue(auxValue);
        }
    },

    onShow: function() {
        var me = this;
        me.showTimePicker();
        me.callParent();
    },

    showTimePicker: function() {
        var me = this,
            el = me.el;

        Ext.defer(function() {
            var body = Ext.getBody(),
                bodyWidth = body.getViewSize().width,
                alignTo = (bodyWidth < (el.getX() + el.getWidth() + 140)) ? 'tl' : 'tr',
                xPos = alignTo == 'tl' ? -135 : 5,
                backgroundColor, toolbar;

            me.timePicker.setHeight(el.getHeight());
            me.timePicker.showBy(me, alignTo, [xPos, 0]);

            toolbar = me.timePicker.down('toolbar').getEl();
            backgroundColor = toolbar.getStyle('background-color');
            if (backgroundColor == 'transparent') {
                toolbar.setStyle('background-color', toolbar.getStyle('border-color'));
            }
        }, 1);
    },

    onHide: function() {
        var me = this;
        me.timePicker.hide();
        me.callParent();
    },

    beforeDestroy: function() {
        var me = this;

        if (me.rendered) {
            Ext.destroy(
                me.timePicker,
                me.minuteSlider,
                me.hourSlider
            );
        }
        me.callParent();
    },

    setValue: function(value) {
        value = value || new Date();
        value.setSeconds(0);
        this.value = new Date(value);
        return this.update(this.value);
    },

    selectToday: function() {
        var me = this,
            btn = me.todayBtn,
            handler = me.handler,
            auxDate = new Date();

        if (btn && !btn.disabled) {
            me.setValue(new Date(auxDate.setSeconds(0)));
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
        return me;
    },

    handleDateClick: function(e, t, /*private*/ blockStopEvent) {
        var me = this,
            handler = me.handler,
            hourSet = me.timePicker.items.items[0].getValue(),
            minuteSet = me.timePicker.items.items[1].getValue(),
            auxDate = new Date(t.dateValue);

        if(blockStopEvent !== true) {
            e.stopEvent();
        }

        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.doCancelFocus = me.focusOnSelect === false;
            auxDate.setHours(hourSet, minuteSet, 0);
            me.setValue(new Date(auxDate));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
    },

    selectedUpdate: function(date) {
        var me = this,
            dateOnly = Ext.Date.clearTime(date, true),
            currentDate = (me.pickerField && me.pickerField.getValue()) || new Date();

        this.callParent([dateOnly]);

        if (currentDate) {
            Ext.defer(function() {
                me.hourSlider.setValue(currentDate.getHours());
                me.minuteSlider.setValue(currentDate.getMinutes());
            }, 10);

        }
    },

    fullUpdate: function(date) {
        var me = this,
            dateOnly = Ext.Date.clearTime(date, true),
            currentDate = (me.pickerField && me.pickerField.getValue()) || new Date();

        this.callParent([dateOnly]);

        if (currentDate) {
            Ext.defer(function() {
                me.hourSlider.setValue(currentDate.getHours());
                me.minuteSlider.setValue(currentDate.getMinutes());
            }, 10);
        }
    }
});


    /*extend:'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    alias: 'widget.datetimefield',
    layout: 'hbox',
    height: 22,

    combineErrors: true,

    msgTarget :'side',  

    layout: 'hbox',

    readOnly: false,    

    dateFormat: 'd/m/Y',

    timeFormat: 'H:i',

    dateConfig:{},

    timeConfig:{},

    dateValue: null,

    dateField: null,

    timeField: null,    

    initComponent: function() {
        var me = this,
            key,
            tab;
        // set default to no items
        me.items = me.items || [];
        
        me.dateField = Ext.create('Ext.form.field.Date', Ext.apply({
            format:me.dateFormat,
            flex:1,
            isFormField:false, //exclude from field query's
            submitValue:false
        }, me.dateConfig));
        me.items.push(me.dateField);
        
        me.timeField = Ext.create('Ext.form.field.Time', Ext.apply({
            format:me.timeFormat,
            flex:1,
            isFormField:false, //exclude from field query's
            submitValue:false
        }, me.timeConfig));
        me.items.push(me.timeField);
        
        for (var i = 0; i < me.items.length; i++) {
            me.items[i].on('focus', Ext.bind(me.onItemFocus, me));
            me.items[i].on('blur', Ext.bind(me.onItemBlur, me));
            me.items[i].on('specialkey', function(field, event){
                key = event.getKey();
                tab = (key == event.TAB);
                
                if (tab && me.focussedItem == me.dateField) {
                    event.stopEvent();
                    me.timeField.focus();
                    return;
                }
                
                me.fireEvent('specialkey', field, event);
            });
        }

        me.callParent();
        
        // this dummy is necessary because Ext.Editor will not check whether an inputEl is present or not
        me.inputEl = {
            dom:{},
            swallowEvent:function(){}
        };
        
        me.initField();
    },

    focus:function(){
        this.callParent();
        this.dateField.focus();
    },

    onItemFocus:function(item){
        if (this.blurTask){
            this.blurTask.cancel();
        }
        this.focussedItem = item;
    },
    
    onItemBlur:function(item){
        var me = this;
        if (item != me.focussedItem){ return; }
        // 100ms to focus a new item that belongs to us, otherwise we will assume the user left the field
        me.blurTask = new Ext.util.DelayedTask(function(){
            me.fireEvent('blur', me);
        });
        me.blurTask.delay(100);
    },    

    getValue: function() {
        var me = this,
            value = null,
            date = me.dateField.getSubmitValue(),
            time = me.timeField.getSubmitValue();
        if(date){
            if(time){
                var format = me.getFormat()
                value = Ext.Date.parse(date + ' ' + time,format)
            }else{
                value = me.dateField.getValue()
            }
        }
        return value
    },

    setValue: function(value){
        var oldvalue = this.dateField.getValue();
        if (Ext.isString(value)){
            value = Ext.Date.parse(value, this.getFormat()); //this.dateTimeFormat
        }
        this.dateField.setValue(value);
        this.timeField.setValue(value);
        this.validate();
        if (value != oldvalue){
            this.fireEvent('change', this, value)
        }
        
    },

    resetOriginalValue: function() {
        var me = this;
        me.originalValue = me.getValue();
        me.dateField.resetOriginalValue();
        me.timeField.resetOriginalValue();
        me.checkDirty();
    },

    getSubmitValue: function(){   
        var me = this,
            format = me.getFormat(),
            value = me.getValue();
            
        return value ? Ext.Date.format(value, format) : null;        
    },         

    getSubmitData: function(){
        var me = this,
            data = null;
            
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            data = {};
            data[me.getName()] = '' + me.getSubmitValue();
        }
        return data;
    },

    getFormat: function(){
        var me = this;
        return (me.dateField.submitFormat || me.dateField.format) + " " + (me.timeField.submitFormat || me.timeField.format)
    },
   
    setMinValue: function(date){
        var me = this;
        me.dateField.setMinValue(date);
    },
  
    setMaxValue: function(date){
        var me = this;
        me.dateField.setMaxValue(date);
    },
    validate: function(){
        var me = this;
        return me.dateField.validate();
    }
}); */