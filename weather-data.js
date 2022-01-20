"use strict";

function Weather(cityName, description) {
  this.cityName = cityName;
  this.description = description;
  this._temperatur = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
  get: function() {
    return this._temperatur;
  },
  set: function(value) {
    this._temperatur = (value * 1.8 + 32).toFixed(2) + 'F.';
  }
})