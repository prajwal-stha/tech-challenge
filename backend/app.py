import uuid
from datetime import timedelta

from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required


app = Flask(__name__)

# Enable CORS for frontend interaction
CORS(app, origins=["http://localhost:3000"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     supports_credentials=True)

# JWT configuration
app.config['JWT_SECRET_KEY'] = 'TECH_CHALLENGE'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_NAME'] = 'TECH_CHALLENGE_ACCESS_TOKEN'
app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)


jwt = JWTManager(app)


# Dummy user
USER = {
    'username': 'tech',
    'password': 'tech_challenge$$$123'
}

# In-memory data store
notes = {}


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if data['username'] == USER['username'] and data['password'] == USER['password']:
        token = create_access_token(identity=data['username'])
        resp = jsonify({'login': True})
        resp.set_cookie(
            'TECH_CHALLENGE_ACCESS_TOKEN',
            token,
            httponly=True,
            samesite='Lax',
            secure=False
        )
        return resp
    return jsonify({'login': False}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    resp.delete_cookie('TECH_CHALLENGE_ACCESS_TOKEN')
    return resp


@app.route('/api/notes', methods=['POST'])
@jwt_required()
def create_note():
    """
    Create a new note
    :return:
    """
    data = request.json
    note_id = str(uuid.uuid4())
    note = {
        'id': note_id,
        'title': data.get('title'),
        'content': data.get('content')
    }
    notes[note_id] = note
    return jsonify(note), 201

@app.route('/api/notes', methods=['GET'])
@jwt_required()
def get_notes():
    """
    Get all notes
    :return:
    """
    return jsonify(list(notes.values())), 200

@app.route('/api/notes/<note_id>', methods=['GET'])
@jwt_required()
def get_note(note_id):
    """
    Get a single note
    :param note_id:
    :return:
    """
    note = notes.get(note_id)
    if note:
        return jsonify(note), 200
    return jsonify({'error': 'Note not found'}), 404

@app.route('/api/notes/<note_id>', methods=['PUT'])
@jwt_required()
def update_note(note_id):
    """
    Update a note
    :param note_id:
    :return:
    """
    data = request.json
    if note_id in notes:
        notes[note_id]['title'] = data.get('title', notes[note_id]['title'])
        notes[note_id]['content'] = data.get('content', notes[note_id]['content'])
        return jsonify(notes[note_id]), 200
    return jsonify({'error': 'Note not found'}), 404

@app.route('/api/notes/<note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    """
    Delete a note
    :param note_id:
    :return:
    """
    if note_id in notes:
        del notes[note_id]
        return jsonify({'message': 'Note deleted'}), 200
    return jsonify({'error': 'Note not found'}), 404


if __name__ == '__main__':
    app.run(debug=True, port=5001)
