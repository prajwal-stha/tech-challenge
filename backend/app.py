from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import uuid


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]) # Enable CORS for frontend interaction


# In-memory data store
notes = {}


@app.route('/api/notes', methods=['POST'])
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
def get_notes():
    """
    Get all notes
    :return:
    """
    return jsonify(list(notes.values())), 200

@app.route('/api/notes/<note_id>', methods=['GET'])
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
