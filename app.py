from flask import Flask, render_template, request, jsonify, session
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'

boggle_game = Boggle()

@app.route('/')
def home():
    """Render the home page with the Boggle board."""
    board = boggle_game.make_board()
    session['board'] = board
    print(session)
    return render_template('home.html', board=board)

@app.route('/check-word', methods=['POST'])
def check_word():
    """Receive user-submitted word and check if it's valid."""
    word = request.json['word']
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify(result=result)

@app.route('/update-score', methods=['POST'])
def update_score():
    """Update score and number of times played."""
    score = request.json['score']
    plays = session.get('plays', 0) + 1
    session['plays'] = plays
    
    highest_score = session.get('highest_score', 0)
    if score > highest_score:
        session['highest_score'] = score

    return jsonify(success=True)



@app.route('/session-data')
def session_data():
    return jsonify(session)
