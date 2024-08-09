# Scrollio

Auto scrolls webpages at a reasonable pace. Made for Firefox Android, can be used on Firefox Desktop, should work for Chrome / Edge if you want to fork

**Current Features**
1. Customizable scrolling amount based on window size with adjustable intervals
1. Toggle start / stop scrolling on demand
1. Toggle auto-advance to next page at the end of a page, or by manual toggle (predicts next page url index using current url)
1. Simple black and white material design

**To-do**
1. Automatically toggle reader mode (not avaliable in Firefox on Android :sob:)
1. Formatting.

# Changelog

## [1.2.0] - 2024-08-08

### Added

- Display for current scrolling interval
- Buttons to change the scrolling interval
- Mininum floor value of 0 for window ratio and scrolling interval (unless somebody wants to scroll up?)

## [1.1.0] - 2024-03-25

### Changed

- Duration of each scroll from 0.1s to 10s

## [1.0.0] - 2024-03-20

### Added

- Checkbox to auto-scroll on new page load
- Checkbox to determine if page has reach its end, and to advance to next page (looks for the page index in URL and increments it)

## [0.9.1] - 2024-03-14

### Added

- Adjuster to control the amount of scrolling each interval as a ratio of current displayed window size