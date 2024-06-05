# Scrollio

Auto scrolls webpages at a reasonable pace. Made for Firefox Android, can be used on Firefox Desktop, should work for Chrome / Edge if you want to fork

**Current Features**
1. Customizable scrolling amount based on window size every 10s
1. Toggle start / stop scrolling on demand
1. Toggle auto-advance to next page at the end of a page, or by manual toggle (predicts next page url index using current url)
1. Simple black and white material design

**To-do**
1. Automatically toggle reader mode (not avaliable in Firefox on Android :sob:)
1. Formatting.

# Changelog

## [1.1.0] - 2024-03-25

### Changed

- Duration of each scroll from 0.1s to 10s

## [1.0.0] - 2024-03-20

### Added

- Checkbox to auto-scroll on new page load
- Checkbox to determine if page has reach its end, and to advance to next page (looks for page index in URL and incrementing)

## [0.9.1] - 2024-03-14

### Added

- Adjuster to control the amount of scrolling each interval as a ratio of current displayed window size