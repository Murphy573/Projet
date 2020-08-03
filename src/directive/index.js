import Vue from 'vue';
import Permission from './permission';
import Clipboard from './clipboard';
import InputNumber from './number';

[Permission, Clipboard, InputNumber].forEach(d => Vue.use(d));
