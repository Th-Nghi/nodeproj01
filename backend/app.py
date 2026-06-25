from flask import Flask, jsonify, request
import os
from pytds import connect

app = Flask(__name__)

@app.route('/api/hello')
def hello():
    return jsonify({
        'message': 'Hello from the backend',
        'status': 'ok'
    })

@app.route('/api/weather')
def weather():
    city = request.args.get('city', 'London')
    samples = {
        'london': {'temp': 15, 'condition': 'Cloudy', 'humidity': 72},
        'new york': {'temp': 24, 'condition': 'Sunny', 'humidity': 55},
        'tokyo': {'temp': 20, 'condition': 'Rainy', 'humidity': 85},
        'sydney': {'temp': 18, 'condition': 'Windy', 'humidity': 63},
        'singapore': {'temp': 30, 'condition': 'Humid', 'humidity': 78}
    }
    weather = samples.get(city.lower(), samples['london'])
    return jsonify({
        'city': city,
        'temperature': weather['temp'],
        'condition': weather['condition'],
        'humidity': weather['humidity'],
        'note': f'Weather data delivered from backend for {city}'
    })

@app.route('/api/client-info')
def client_info():
    return jsonify({
        'serverReceived': {
            'userAgent': request.headers.get('User-Agent'),
            'clientIp': request.remote_addr,
            'acceptLanguage': request.headers.get('Accept-Language')
        }
    })

@app.route('/api/server-info')
def server_info():
    password = os.environ.get('MSSQL_SA_PASSWORD')
    if not password:
        return jsonify({'error': 'Missing MSSQL_SA_PASSWORD environment variable'}), 500

    try:
        with connect(server='mssql', database='master', user='sa', password=password, port=1433) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT SERVERPROPERTY('ServerName') AS servername, cpu_count FROM sys.dm_os_sys_info")
            row = cursor.fetchone()
            if row:
                return jsonify({'servername': row[0], 'cpu': row[1]})
            return jsonify({'error': 'No data returned from SQL Server'}), 500
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

    