import can from 'can';
import $ from 'jquery';
import 'semantic-ui-daterangepicker';
import 'semantic-ui-daterangepicker/daterangepicker.css';
import moment from 'moment';

// import 'semantic-ui-transition/transition';

/**
 * A can.view.attr wrapper around SemanticUI Date Range Picker. Settings can be defined as "semantic"-prefixed attributes.
 *
 * Note: CSS should be imported separately.
 *
 * Example:
 *    With default settings:
 *    <input type="text" semantic-daterangepicker />
 *
 *    TODO: With custom settings:
 *
 */
can.view.attr('semantic-daterangepicker', function(el, attrData) {
  let attrs = getConfigObjFromAttrs(el),
    $el = $(el);

  let options = {
    startDate: attrs['start-date'] ? moment(attrs['start-date'], attrs.format).startOf('day') : undefined,
    endDate: attrs['end-date'] ? moment(attrs['end-date'], attrs.format).endOf('day') : undefined,
    minDate: attrs['min-date'] ? moment(attrs['min-date'], attrs.format).endOf('day') : undefined,
    maxDate: attrs['max-date'] ? moment(attrs['max-date'], attrs.format).endOf('day') : undefined,
    dateLimit: attrs['date-limit'] ? JSON.parse(attrs['date-limit']) : undefined,
    showDropdowns: !!attrs['show-dropdowns'],
    showWeekNumbers: !!attrs['show-week-numbers'],
    showISOWeekNumbers: !!attrs['show-iso-week-numbers'],
    timePicker: !!attrs['time-picker'],
    timePickerIncrement: attrs['time-picker-increment'] ? parseInt(attrs['time-picker-increment']) : undefined,
    timePicker24Hour: !!attrs['time-picker-24-hour'],
    timePickerSeconds: !!attrs['time-picker-seconds'],
    ranges: attrs.ranges ? JSON.parse(attrs.ranges) : undefined,
    opens: attrs.opens || 'left',
    drops: attrs.drops || 'down',
    // A comma-separated string of classes to be added to the buttons.
    buttonClasses: attrs['button-classes'] ? attrs['button-classes'].split(',').replace(' ', '') : undefined,
    applyClass: attrs['apply-class'],
    cancelClass: attrs['cancel-class'],
    singleDatePicker: !!attrs.single,
    format: attrs.format,
    autoApply: !!attrs['auto-apply'],
    linkedCalendars: !!attrs['linked-calendars'],
    parentEl: attrs['parent-el'],
    isInvalidDate: attrs['is-invalid-date-fn'],
    isCustomDate: attrs['is-custom-date-fn'],
    autoUpdateInput: !!attrs['auto-update-input'],
    alwaysShowCalendars: !!attrs['always-show-calendars'],
    locale: {
      format: attrs['locale-format'],
      separator: attrs['locale-separator'],
      applyLabel: attrs['locale-apply-label'],
      cancelLabel: attrs['locale-cancel-label'],
      fromLabel: attrs['locale-from-label'],
      toLabel: attrs['locale-to-label'],
      customRangeLabel: attrs['locale-custom-range-label'],
      weekLabel: attrs['locale-week-label'],
      // A comma-separated string of days of week starting with Sun.
      daysOfWeek: attrs['locale-days-of-week'] ? attrs['locale-days-of-week'].split(',').replace(' ', '') : undefined,
      // A comma-separated string of months starting with January.
      monthNames: attrs['locale-month-names'] ? attrs['locale-month-names'].split(',').replace(' ', '') : undefined,
      firstDay: attrs['first-day'] || 1
    }
  };

  $el.on('focus', function(){
    if(!$el.data('daterangepicker')){
      $el.daterangepicker(options);
      $el.click();
    }
  });
});

function getConfigObjFromAttrs(el){
  let attributes = [].slice.call(el.attributes);
  let attrObj = {};
  attributes.map(attr => {
    attrObj[attr.name] = attr.value;
  });
  return attrObj;
}
