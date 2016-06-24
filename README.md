# semantic-ui-daterangepicker-canjs

CanJS wrapper around SemanticUI Date Range Picker component

A [can.view.attr](https://canjs.com/docs/can.view.attr.html) wrapper around the [SemanticUI Date Range Picker](https://github.com/BreadMaker/semantic-ui-daterangepicker). With `can.view.attr` you can add custom behavior to elements that contain a specified html attribute. Since SemanticUI is a set of jQuery plugins, `can.view.attr` is a natural way to invoke them in a [CanJS](https://canjs.com) or [DoneJS](https://donejs.com/) application.

This wrapper allows you to use SemanticUI Date Range Picker with just html, no need to run jQuery plugin yourself.

SemanticUI's CSS should be imported separately. You can use `semantic-ui-less` package as in this demo.


## Demo

See the included demo /demo/demo.html (run `npm install`, then `http-server` in the project root and browse /demo/demo.html).

![Date Range Picker](https://camo.githubusercontent.com/1083660a91a3d95a2dd4e8e5e74dfc9703fcdadd/687474703a2f2f692e696d6775722e636f6d2f4c62414d6633442e706e67)

## Installation
```
npm install semantic-ui-daterangepicker-canjs --save
```

## Usage
```
<input type="text" semantic-daterangepicker />

<!-- As a single-calendar date-picker -->
<input type="text" semantic-daterangepicker single="true"/>

<!-- Specify start and end dates -->
<input type="text" semantic-daterangepicker
  start-date="6/23/2016"
  end-date="9/23/2016"/>

<!-- Specify date string format -->
<input type="text" semantic-daterangepicker
  start-date="Jun 23 2016"
  end-date="Sep 23 2016"
  format="MMM D Y"/>
```

### Use as a single date picker with live binding

Use a template like this:
```handlebars
<input type="text" semantic-daterangepicker
  single="true"
  {($value)}="formattedDate"
  format="MMM D Y"/>

```

And this example viewModel:

```js
import Map from 'can/map/';
import 'can/map/define/';
import moment from 'moment';

let DateMap = Map.extend({
  define: {
    date: {
      value: new Date()
    },

    formattedDate: {
      get(){
        let date = this.attr('date');
        return moment(date).format('MMM D Y');
      },
      set(val){
        let date = moment(val);
        // If an invalid date is set, set it to today's date.
        if (date.toString() === 'Invalid date') {
          return this.attr('formattedDate', moment());
        }
        this.attr('date', date);
        return val;
      }
    }
  }
});

let dateMap = new DateMap();

$('#demo').viewModel(dateMap).attr(dateMap);
```

## API

Attributes:
- `semantic-daterangepicker` - main attribute to invoke the wrapper
- `start-date` - (Date object, moment object or string) The start of the initially selected date range
- `end-date` - (Date object, moment object or string) The end of the initially selected date range
- `min-date` - (Date object, moment object or string) The earliest date a user may select
- `max-date` - (Date object, moment object or string) The latest date a user may select
- `format` - (Moment.js format string) Specifies the expected format for parsing the text input's value.
- `date-limit` - (A JSON-parseable string starting with a space) The maximum span between the selected start and end dates. Can have any property you can add to a moment object (i.e. days, months)
- `show-dropdowns` - (boolean) Show year and month select boxes above calendars to jump to a specific month and year
- `show-week-numbers` - (boolean) Show localized week numbers at the start of each week on the calendars
- `show-iso-week-numbers` - (boolean) Show ISO week numbers at the start of each week on the calendars
- `time-picker` - (boolean) Allow selection of dates with times, not just dates
- `time-picker-increment` - (number) Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30)
- `time-picker-24-hour` - (boolean) Use 24-hour instead of 12-hour times, removing the AM/PM selection
- `time-picker-seconds` - (boolean) Show seconds in the timePicker
- `ranges` - (A JSON-parseable string beginning with a space) Set predefined date ranges the user can select from. Each key is the label for the range, and its value an array with two dates representing the bounds of the range
- `opens` - (string: 'left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to
- `drops` - (string: 'down' or 'up') Whether the picker appears below (default) or above the HTML element it's attached to
- `button-classes` - (comma-separated string) CSS class names that will be added to all buttons in the picker
- `apply-class` - (string) CSS class string that will be added to the apply button
- `cancel-class` - (string) CSS class string that will be added to the cancel button
- `single-date-picker` - (boolean) Show only a single calendar to choose one date, instead of a range picker with two calendars; the start and end dates provided to your callback will be the same single date chosen
- `auto-apply` - (boolean) Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates or a predefined range is selected
- `linked-calendars` -  (boolean) When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars. When disabled, the two calendars can be individually advanced and display any month/year.
- `parent-el` - (string) jQuery selector of the parent element that the date range picker will be added to, if not provided this will be 'body'
- `is-invalid-date-fn` - (function) A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
- `is-custom-date-fn` - (function) A function that is passed each date in the two calendars before they are displayed, and may return a string or array of CSS class names to apply to that date's calendar cell.
- `auto-update-input` - (boolean) Indicates whether the date range picker should automatically update the value of an <input> element it's attached to at initialization and when the selected dates change.
- `always-show-calendars` - (boolean) Normally, if you use the ranges option to specify pre-defined date ranges, calendars for choosing a custom date range are not shown until the user clicks "Custom Range". When this option is set to true, the calendars for choosing a custom date range are always shown instead.
- `locale-separator` - (string) in multiple calendar mode, allows for customizing the separator between the two dates in the text input.
- `locale-apply-label` - (string) allows customizing the text in the apply button.
- `locale-cancel-label` - (string) allows customizing the text in the cancel button.
- `locale-from-label` - (string) allows customizing the 'from' label.
- `locale-to-label` - (string) allows customizing the 'to' label.
- `locale-custom-range-label` - (string) allows customizing the name of the last range in the list. (when the ranges are turned on.)
- `locale-week-label` - (string) allows customizing the label that appears when `show-week-numbers` is set to true.
- `locale-days-of-week` - (comma-separated string) allows customizing the labels for the days of the week in the calendar.
- `locale-month-names` - (comma-separated string) allows customizing the month names.
- `locale-first-day` - (integer)

## Contributing
Pull requests are welcome.

## Authors
- [Ilya Fadeev](https://github.com/ilyavf)
- [Marshall Thompson](https://github.com/marshallswain)
