import React from "react";
import moment from "moment";
import ReactEcharts from 'echarts-for-react';
import './StockPage.css'

let upColor = '#ec0000';
let downColor = '#00da3c';

let dataUrl = "https://ali-stock.showapi.com/realtime-k?";
let appCode = "APPCODE 9b138b2dbe0f4ee0a6ec170a0b77ac0e";

let testTime = ["2019-01-02", "2019-01-03", "2019-01-04", "2019-01-07", "2019-01-08", "2019-01-09", "2019-01-10", "2019-01-11", "2019-01-14", "2019-01-15", "2019-01-21", "2019-01-22", "2019-01-23", "2019-01-24", "2019-01-25", "2019-01-28", "2019-01-29", "2019-01-30", "2019-01-31", "2019-02-11", "2019-02-12", "2019-02-14", "2019-02-15", "2019-02-18", "2019-02-22", "2019-02-25", "2019-02-27", "2019-03-01", "2019-03-06", "2019-03-07", "2019-03-08", "2019-03-11", "2019-03-12", "2019-03-13", "2019-03-14", "2019-03-20", "2019-03-21", "2019-03-22", "2019-03-25", "2019-03-26", "2019-03-27", "2019-03-28", "2019-03-29", "2019-04-02", "2019-04-03", "2019-04-04", "2019-04-09", "2019-04-10", "2019-04-11", "2019-04-12", "2019-04-16", "2019-04-17", "2019-04-18", "2019-04-22", "2019-04-23", "2019-04-25", "2019-04-26", "2019-04-29", "2019-04-30", "2019-05-07", "2019-05-08", "2019-05-09", "2019-05-14", "2019-05-16", "2019-05-17", "2019-05-20", "2019-05-21", "2019-05-22", "2019-05-23", "2019-05-24", "2019-05-27", "2019-05-29", "2019-05-31", "2019-06-03", "2019-06-04", "2019-06-05", "2019-06-06", "2019-06-10", "2019-06-14", "2019-06-17", "2019-06-18", "2019-06-19", "2019-06-24", "2019-06-26", "2019-06-28", "2019-07-03", "2019-07-04", "2019-07-05", "2019-07-11", "2019-07-15", "2019-07-16", "2019-07-18", "2019-07-22", "2019-07-23", "2019-07-24", "2019-07-26", "2019-07-29", "2019-07-30", "2019-07-31", "2019-08-01", "2019-08-02", "2019-08-05", "2019-08-06", "2019-08-07", "2019-08-08", "2019-08-09", "2019-08-13", "2019-08-14", "2019-08-15", "2019-08-16", "2019-08-19", "2019-08-20", "2019-08-21", "2019-08-22", "2019-08-23", "2019-08-27", "2019-08-29", "2019-08-30", "2019-09-02", "2019-09-04", "2019-09-05", "2019-09-09", "2019-09-10", "2019-09-11", "2019-09-12", "2019-09-16", "2019-09-17", "2019-09-18", "2019-09-19", "2019-09-20", "2019-09-24", "2019-09-25", "2019-09-27", "2019-09-30", "2019-10-08", "2019-10-09", "2019-10-10", "2019-10-11", "2019-10-14", "2019-10-16", "2019-10-18", "2019-10-21", "2019-10-23", "2019-10-24", "2019-10-28", "2019-10-30", "2019-10-31", "2019-11-01", "2019-11-04", "2019-11-06", "2019-11-07", "2019-11-08", "2019-11-11", "2019-11-13", "2019-11-19", "2019-11-20", "2019-11-22", "2019-11-26", "2019-11-29", "2019-12-03", "2019-12-04", "2019-12-05", "2019-12-06", "2019-12-09", "2019-12-10", "2019-12-12", "2019-12-13", "2019-12-16", "2019-12-17", "2019-12-18", "2019-12-23", "2019-12-24", "2019-12-26", "2019-12-27", "2019-12-31", "2020-01-02", "2020-01-07", "2020-01-08", "2020-01-09", "2020-01-10", "2020-01-13", "2020-01-14", "2020-01-15", "2020-01-16", "2020-01-20", "2020-01-21", "2020-01-22", "2020-01-23", "2020-02-04", "2020-02-06", "2020-02-07", "2020-02-10", "2020-02-13", "2020-02-14", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-24", "2020-02-27", "2020-03-03", "2020-03-04", "2020-03-06", "2020-03-10", "2020-03-11", "2020-03-12", "2020-03-13", "2020-03-16", "2020-03-17", "2020-03-18", "2020-03-20", "2020-03-23", "2020-03-24", "2020-03-25", "2020-03-26", "2020-03-27", "2020-03-30", "2020-03-31", "2020-04-01", "2020-04-02", "2020-04-03", "2020-04-10", "2020-04-13", "2020-04-14", "2020-04-15", "2020-04-16", "2020-04-17", "2020-04-20", "2020-04-21", "2020-04-22", "2020-04-24", "2020-04-28", "2020-04-29", "2020-04-30", "2020-05-06", "2020-05-07", "2020-05-08", "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-18", "2020-05-21", "2020-05-22", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-29", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-05", "2020-06-08", "2020-06-09", "2020-06-10", "2020-06-11", "2020-06-12", "2020-06-15", "2020-06-16", "2020-06-17", "2020-06-18", "2020-06-22", "2020-06-23", "2020-06-24", "2020-06-30", "2020-07-01", "2020-07-02", "2020-07-03", "2020-07-06", "2020-07-09", "2020-07-10", "2020-07-13", "2020-07-14", "2020-07-15", "2020-07-16", "2020-07-17", "2020-07-21", "2020-07-22", "2020-07-23", "2020-08-03", "2020-08-10", "2020-08-12", "2020-08-14", "2020-08-14"];
let testData = [[9.16, 8.91, 9.16, 8.91], [9.08, 8.9, 9.08, 8.9], [9.55, 8.97, 9.55, 8.97], [9.58, 9.37, 9.58, 9.37], [9.48, 9.36, 9.48, 9.36], [9.81, 9.44, 9.81, 9.44], [9.92, 9.59, 9.92, 9.59], [9.94, 9.78, 9.94, 9.78], [9.97, 9.8, 9.97, 9.8], [10.0, 9.82, 10.0, 9.82], [10.28, 10.04, 10.28, 10.04], [10.16, 9.98, 10.16, 9.98], [10.19, 10.01, 10.19, 10.01], [10.26, 10.09, 10.26, 10.09], [10.74, 10.26, 10.74, 10.26], [10.84, 10.58, 10.84, 10.58], [10.77, 10.48, 10.77, 10.48], [10.88, 10.56, 10.88, 10.56], [10.9, 10.64, 10.9, 10.64], [10.94, 10.67, 10.94, 10.67], [11.0, 10.73, 11.0, 10.73], [11.1, 10.89, 11.1, 10.89], [10.92, 10.6, 10.92, 10.6], [11.05, 10.74, 11.05, 10.74], [11.3, 10.97, 11.3, 10.97], [12.3, 11.26, 12.3, 11.26], [12.32, 11.82, 12.32, 11.82], [12.43, 11.94, 12.43, 11.94], [13.02, 12.49, 13.02, 12.49], [12.71, 12.21, 12.71, 12.21], [12.35, 11.92, 12.35, 11.92], [12.15, 11.72, 12.15, 11.72], [12.3, 11.91, 12.3, 11.91], [12.21, 11.8, 12.21, 11.8], [12.28, 11.94, 12.28, 11.94], [12.59, 12.28, 12.59, 12.28], [12.45, 12.24, 12.45, 12.24], [12.39, 12.16, 12.39, 12.16], [12.06, 11.77, 12.06, 11.77], [11.96, 11.68, 11.96, 11.68], [12.13, 11.85, 12.13, 11.85], [11.98, 11.77, 11.98, 11.77], [12.47, 11.88, 12.47, 11.88], [13.18, 12.87, 13.18, 12.87], [13.08, 12.79, 13.08, 12.79], [13.62, 13.07, 13.62, 13.07], [14.04, 13.38, 14.04, 13.38], [13.5, 13.04, 13.5, 13.04], [13.58, 13.12, 13.58, 13.12], [13.22, 12.85, 13.22, 12.85], [14.18, 13.29, 14.18, 13.29], [14.19, 13.84, 14.19, 13.84], [13.98, 13.73, 13.98, 13.73], [14.44, 13.91, 14.44, 13.91], [13.81, 13.59, 13.81, 13.59], [14.24, 13.78, 14.24, 13.78], [13.86, 13.33, 13.86, 13.33], [13.94, 13.48, 13.94, 13.48], [13.67, 13.22, 13.67, 13.22], [12.99, 12.37, 12.99, 12.37], [12.56, 12.16, 12.56, 12.16], [12.24, 11.72, 12.24, 11.72], [12.4, 11.9, 12.4, 11.9], [12.75, 12.43, 12.75, 12.43], [12.58, 12.02, 12.58, 12.02], [12.2, 11.92, 12.2, 11.92], [12.38, 12.02, 12.38, 12.02], [12.23, 11.99, 12.23, 11.99], [12.08, 11.81, 12.08, 11.81], [12.11, 11.98, 12.11, 11.98], [12.08, 11.61, 12.08, 11.61], [12.25, 11.93, 12.25, 11.93], [12.06, 11.78, 12.06, 11.78], [11.99, 11.5, 11.99, 11.5], [11.62, 11.28, 11.62, 11.28], [11.81, 11.6, 11.81, 11.6], [11.74, 11.57, 11.74, 11.57], [12.13, 11.65, 12.13, 11.65], [12.37, 12.11, 12.37, 12.11], [12.44, 12.14, 12.44, 12.14], [12.5, 12.25, 12.5, 12.25], [13.03, 12.66, 13.03, 12.66], [13.57, 13.24, 13.57, 13.24], [13.35, 12.97, 13.35, 12.97], [13.62, 13.35, 13.62, 13.35], [14.0, 13.64, 14.0, 13.64], [14.04, 13.65, 14.04, 13.65], [13.74, 13.46, 13.74, 13.46], [13.65, 13.3, 13.65, 13.3], [13.99, 13.61, 13.99, 13.61], [13.75, 13.48, 13.75, 13.48], [13.58, 13.38, 13.58, 13.38], [13.84, 13.53, 13.84, 13.53], [13.64, 13.42, 13.64, 13.42], [13.77, 13.56, 13.77, 13.56], [14.03, 13.84, 14.03, 13.84], [14.21, 13.94, 14.21, 13.94], [14.3, 14.05, 14.3, 14.05], [14.08, 13.84, 14.08, 13.84], [13.95, 13.7, 13.95, 13.7], [13.65, 13.43, 13.65, 13.43], [13.41, 13.05, 13.41, 13.05], [13.23, 12.81, 13.23, 12.81], [13.41, 13.14, 13.41, 13.14], [14.25, 13.62, 14.25, 13.62], [14.6, 14.19, 14.6, 14.19], [14.86, 14.49, 14.86, 14.49], [14.96, 14.55, 14.96, 14.55], [14.71, 14.35, 14.71, 14.35], [14.88, 14.53, 14.88, 14.53], [14.69, 14.27, 14.69, 14.27], [14.94, 14.52, 14.94, 14.52], [14.64, 14.14, 14.64, 14.14], [14.21, 13.96, 14.21, 13.96], [14.49, 14.11, 14.49, 14.11], [14.25, 14.0, 14.25, 14.0], [14.04, 13.84, 14.04, 13.84], [14.15, 13.86, 14.15, 13.86], [14.25, 13.87, 14.25, 13.87], [14.26, 14.07, 14.26, 14.07], [14.6, 14.3, 14.6, 14.3], [14.75, 14.37, 14.75, 14.37], [14.39, 14.17, 14.39, 14.17], [14.46, 14.22, 14.46, 14.22], [14.53, 14.28, 14.53, 14.28], [14.47, 14.16, 14.47, 14.16], [14.21, 13.94, 14.21, 13.94], [14.23, 14.0, 14.23, 14.0], [14.64, 14.23, 14.64, 14.23], [15.14, 14.68, 15.14, 14.68], [15.28, 14.92, 15.28, 14.92], [15.58, 14.93, 15.58, 14.93], [15.77, 15.43, 15.77, 15.43], [15.62, 15.31, 15.62, 15.31], [15.96, 15.34, 15.96, 15.34], [16.24, 15.75, 16.24, 15.75], [15.99, 15.72, 15.99, 15.72], [16.66, 15.93, 16.66, 15.93], [17.3, 16.63, 17.3, 16.63], [17.14, 16.54, 17.14, 16.54], [16.75, 16.27, 16.75, 16.27], [16.68, 16.15, 16.68, 16.15], [16.64, 15.96, 16.64, 15.96], [16.71, 16.16, 16.71, 16.16], [16.75, 16.3, 16.75, 16.3], [16.67, 16.28, 16.67, 16.28], [16.19, 15.97, 16.19, 15.97], [16.71, 16.0, 16.71, 16.0], [16.96, 16.49, 16.96, 16.49], [17.14, 16.59, 17.14, 16.59], [16.78, 16.47, 16.78, 16.47], [16.73, 16.36, 16.73, 16.36], [16.25, 15.93, 16.25, 15.93], [16.18, 15.89, 16.18, 15.89], [16.27, 16.03, 16.27, 16.03], [16.02, 15.5, 16.02, 15.5], [15.65, 15.37, 15.65, 15.37], [15.62, 15.28, 15.62, 15.28], [15.38, 15.18, 15.38, 15.18], [15.2, 14.97, 15.2, 14.97], [15.15, 14.95, 15.15, 14.95], [15.22, 15.04, 15.22, 15.04], [15.45, 15.2, 15.45, 15.2], [15.36, 15.09, 15.36, 15.09], [15.12, 14.99, 15.12, 14.99], [15.41, 15.27, 15.41, 15.27], [15.85, 15.5, 15.85, 15.5], [15.87, 15.6, 15.87, 15.6], [16.35, 15.71, 16.35, 15.71], [16.38, 16.13, 16.38, 16.13], [16.46, 16.16, 16.46, 16.16], [16.22, 15.96, 16.22, 15.96], [16.28, 16.04, 16.28, 16.04], [16.64, 16.15, 16.64, 16.15], [16.35, 16.03, 16.35, 16.03], [16.66, 16.27, 16.66, 16.27], [17.05, 16.66, 17.05, 16.66], [16.76, 16.35, 16.76, 16.35], [16.64, 16.25, 16.64, 16.25], [16.53, 16.24, 16.53, 16.24], [16.74, 16.33, 16.74, 16.33], [16.98, 16.48, 16.98, 16.48], [16.57, 16.17, 16.57, 16.17], [16.29, 15.93, 16.29, 15.93], [16.33, 16.07, 16.33, 16.07], [16.06, 15.66, 16.06, 15.66], [15.89, 15.44, 15.89, 15.44], [15.65, 15.13, 15.65, 15.13], [14.45, 13.78, 14.45, 13.78], [14.64, 14.26, 14.64, 14.26], [14.44, 14.17, 14.44, 14.17], [14.28, 14.06, 14.28, 14.06], [14.69, 14.36, 14.69, 14.36], [14.88, 14.45, 14.88, 14.45], [15.11, 14.82, 15.11, 14.82], [15.36, 14.84, 15.36, 14.84], [15.45, 15.19, 15.45, 15.19], [15.2, 14.89, 15.2, 14.89], [15.01, 14.64, 15.01, 14.64], [14.79, 14.38, 14.79, 14.38], [14.53, 14.26, 14.53, 14.26], [15.38, 14.77, 15.38, 14.77], [14.6, 14.18, 14.6, 14.18], [14.63, 14.37, 14.63, 14.37], [14.59, 14.28, 14.59, 14.28], [14.33, 13.66, 14.33, 13.66], [14.22, 13.52, 14.22, 13.52], [13.73, 12.91, 13.73, 12.91], [13.32, 12.44, 13.32, 12.44], [12.52, 12.05, 12.52, 12.05], [12.14, 11.73, 12.14, 11.73], [12.47, 12.06, 12.47, 12.06], [12.85, 12.49, 12.85, 12.49], [13.11, 12.5, 13.11, 12.5], [13.15, 12.86, 13.15, 12.86], [12.82, 12.54, 12.82, 12.54], [12.87, 12.56, 12.87, 12.56], [12.91, 12.6, 12.91, 12.6], [12.75, 12.45, 12.75, 12.45], [12.67, 12.34, 12.67, 12.34], [12.76, 12.59, 12.76, 12.59], [12.49, 12.26, 12.49, 12.26], [12.64, 12.36, 12.64, 12.36], [12.71, 12.56, 12.71, 12.56], [12.57, 12.33, 12.57, 12.33], [12.82, 12.44, 12.82, 12.44], [12.83, 12.55, 12.83, 12.55], [13.47, 13.07, 13.47, 13.07], [13.19, 12.94, 13.19, 12.94], [13.08, 12.89, 13.08, 12.89], [13.41, 13.05, 13.41, 13.05], [13.86, 13.22, 13.86, 13.22], [14.08, 13.65, 14.08, 13.65], [13.65, 13.38, 13.65, 13.38], [13.53, 13.37, 13.53, 13.37], [13.78, 13.45, 13.78, 13.45], [13.89, 13.66, 13.89, 13.66], [13.81, 13.49, 13.81, 13.49], [13.55, 13.3, 13.55, 13.3], [13.36, 13.0, 13.36, 13.0], [13.2, 12.92, 13.2, 12.92], [13.11, 12.9, 13.11, 12.9], [13.39, 13.13, 13.39, 13.13], [13.11, 12.7, 13.11, 12.7], [12.76, 12.54, 12.76, 12.54], [12.85, 12.72, 12.85, 12.72], [12.97, 12.74, 12.97, 12.74], [13.18, 12.92, 13.18, 12.92], [13.39, 13.08, 13.39, 13.08], [13.63, 13.28, 13.63, 13.28], [13.88, 13.5, 13.88, 13.5], [13.64, 13.43, 13.64, 13.43], [13.85, 13.58, 13.85, 13.58], [13.73, 13.53, 13.73, 13.53], [13.71, 13.4, 13.71, 13.4], [13.39, 13.0, 13.39, 13.0], [13.02, 12.87, 13.02, 12.87], [12.97, 12.8, 12.97, 12.8], [12.99, 12.86, 12.99, 12.86], [12.92, 12.76, 12.92, 12.76], [12.8, 12.59, 12.8, 12.59], [12.84, 12.62, 12.84, 12.62], [12.69, 12.52, 12.69, 12.52], [12.88, 12.6, 12.88, 12.6], [12.97, 12.72, 12.97, 12.72], [13.15, 12.74, 13.15, 12.74], [13.49, 12.97, 13.49, 12.97], [14.32, 13.56, 14.32, 13.56], [15.68, 14.59, 15.68, 14.59], [16.63, 15.31, 16.63, 15.31], [15.48, 14.76, 15.48, 14.76], [15.08, 14.5, 15.08, 14.5], [15.19, 14.55, 15.19, 14.55], [14.86, 14.23, 14.86, 14.23], [14.55, 14.12, 14.55, 14.12], [14.28, 13.95, 14.28, 13.95], [14.77, 14.4, 14.77, 14.4], [14.65, 14.27, 14.65, 14.27], [14.29, 13.81, 14.29, 13.81], [13.99, 13.43, 13.99, 13.43], [14.15, 13.65, 14.15, 13.65], [14.66, 14.15, 14.66, 14.15], [14.51, 14.14, 14.51, 14.14], [14.51, 14.06, 14.51, 14.06]];
let biData = ["-", 8.9, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 13.02, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 11.68, "-", "-", "-", "-", "-", "-", 14.04, "-", "-", 12.85, "-", "-", "-", 14.44, "-", "-", "-", "-", "-", "-", "-", 11.72, "-", "-", "-", "-", 12.38, "-", "-", "-", "-", "-", "-", "-", 11.28, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 14.04, "-", "-", "-", "-", 13.38, "-", "-", "-", "-", "-", 14.3, "-", "-", "-", "-", 12.81, "-", "-", "-", "-", 14.96, "-", "-", "-", "-", "-", "-", "-", "-", 13.84, "-", "-", "-", "-", 14.75, "-", "-", "-", "-", 13.94, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 17.3, "-", "-", "-", 15.96, "-", "-", "-", "-", "-", "-", 17.14, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 14.95, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 17.05, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 13.78, "-", "-", "-", "-", "-", "-", "-", 15.45, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 11.73, "-", "-", "-", 13.15, "-", "-", "-", "-", "-", "-", 12.26, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 14.08, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 12.54, "-", "-", "-", "-", "-", 13.88, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 12.52, "-", "-", "-", "-", "-", "-", 16.63, "-", "-", "-", "-", "-", "-", "-", "-", "-", 13.43, "-", "-", "-", "-"];
let xdData = ["-", 8.9, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 14.04, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 11.72, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 14.04, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 12.81, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 17.3, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 14.95, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 15.45, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 12.26, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 13.88, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 13.43, "-", "-", "-", "-"];

export default class StockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.loadStorage("code") !== null &&  this.loadStorage("code") !== "" ? this.loadStorage("code") : "000636",
            times: testTime,
            valueList: testData,
            ma5: [],
            ma10: [],
            ma20: [],
            ma30: [],
            kTitle: "未知",
            type: "day"
        };
        //this.getData(this.state.code, this.state.type);
        this.changeCode = this.changeCode.bind(this)
        this.changeType = this.changeType.bind(this)
    }

    loadStorage(key) {
        let storage=window.localStorage;
        if (storage.hasOwnProperty(key)) {
            console.log(key + ":" + storage[key]);
            return storage[key]
        }
        return null;
    }

    saveStorage(key, value) {
        let storage=window.localStorage;
        storage[key] = value
    }

    getTimes(kList) {
        let times = [];
        kList.forEach((raw) => {
            times.push(raw["time"])
        });
        return times.reverse();
    }

    getValueList(kList) {
        let list = [];
        kList.forEach((raw) => {
            list.push([
                parseFloat(raw["open"]),
                parseFloat(raw["close"]),
                parseFloat(raw["min"]),
                parseFloat(raw["max"])])
        });
        return list.reverse();
    }

    calculateMA(kList, dayCount) {
        let result = [];
        let valueList = this.getValueList(kList);
        for (let i = 0, len = valueList.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += valueList[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    getTimeByType(type) {
        if (type === "week") {
            return moment().add("year", -1).format("yyyyMMDD");
        }
        if (type === "month") {
            return moment().add("year", -2).format("yyyyMMDD");
        }
        return moment().add("month", -6).format("yyyyMMDD");
    }

    async getData(code, type) {
        try {
            let begin = this.getTimeByType(type);
            let response = await fetch(dataUrl+"beginDay="+begin+"&code="+code+"&time="+type,
                {headers:{"Authorization":appCode}});
            let map = await response.json();
            let kList = map["showapi_res_body"]["dataList"];
            this.setState({
                times: this.getTimes(kList),
                valueList: this.getValueList(kList),
                ma5: this.calculateMA(kList, 5),
                ma10: this.calculateMA(kList, 10),
                ma20: this.calculateMA(kList, 20),
                ma30: this.calculateMA(kList, 30),
                kTitle: map["showapi_res_body"]["name"]
            });
        } catch(e) {
            console.log("Oops, error", e);
        }
    }

    changeCode(e) {
        this.setState({
            code: e.target.value
        });
        this.saveStorage("code", e.target.value);
        this.getData(e.target.value, this.state.type)
    }

    changeType(e) {
        this.setState({
            type: e.target.value
        });
        this.getData(this.state.code, e.target.value)
    }

    render(){
        return(
            <div className="StockPage">
                <div className='StockDetail'>
                    <div className="StockCodeInput">
                        股票代码 <input onBlur={this.changeCode} type='text'/>
                        <label><input name="timeType" type="radio" value="day" onClick={this.changeType} defaultChecked="checked"/>日K </label>
                        <label><input name="timeType" type="radio" value="week" onClick={this.changeType}/>周K </label>
                        <label><input name="timeType" type="radio" value="month" onClick={this.changeType}/>月K </label>
                    </div>
                    <div className="ChartColumn">
                        <ReactEcharts className="StockChart" option={this.getOption()} style={{height:'60vh',width:'100vh'}} theme="Imooc"/>
                    </div>
                    <div className="DataColumn">lalala</div>
                </div>
            </div>
        )
    }

    getOption =()=> {
        let option = {
            title: {
                text: this.state.kTitle,
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['K', 'MA5', 'MA10', 'MA20', 'MA30', 'BI']
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: this.state.times,
                scale: true,
                boundaryGap: false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100,
                },
                {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 50,
                    end: 100
                }
            ],
            series: [
                {
                    name: 'K',
                    type: 'candlestick',
                    data: this.state.valueList,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)',
                        color0: 'rgba(0,0,0,0)',
                        borderColor: upColor,
                        borderColor0: downColor,
                        borderWidth:1.15
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        }
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        }
                                    }
                                }
                            ],
                            {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.state.ma5,
                    xAxisIndex: 0,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: this.state.ma10,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.state.ma20,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.state.ma30,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    },
                    symbolSize: 0.5
                },
                {
                    name: 'BI',
                    type: 'line',
                    data: biData,
                    smooth: false,
                    lineStyle: {
                        opacity: 1,
                        color: 'red'
                    },
                    symbolSize: 0.5,
                    connectNulls: true
                },
                {
                    name: 'XD',
                    type: 'line',
                    data: xdData,
                    smooth: false,
                    lineStyle: {
                        opacity: 1,
                        color: 'blue',
                        type:'dotted'
                    },
                    symbolSize: 0.5,
                    connectNulls: true
                },
            ]
        };
        return option
    }
}