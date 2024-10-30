// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import {getCurrentTimeFormatted} from "../utils/getCurrentTimeFormatted";
import {getFakeSamplesCounter} from "../utils/getFakeSamplesCounter";

export const handlers = [
    http.get('https://my.backend/api/mesData', () => {
        return HttpResponse.json({
            time: getCurrentTimeFormatted(),
            thrust: Math.random() * 30,
            state: 'S',
            // state: 'R',
            // state: '1',
            rate: Math.random() > 0.8 ? (Math.random() > 0.5 ? 4 : 6) : 5,
            samples: Number(getFakeSamplesCounter()),
        })
    }),
]
