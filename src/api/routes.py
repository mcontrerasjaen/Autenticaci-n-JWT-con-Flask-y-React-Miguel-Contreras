"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    # Verificar si el email ya está registrado
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 409

    # Crear nuevo usuario (asegúrarse de que el modelo User tenga email y password)
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado con éxito"}), 201

# 2. RUTA DE LOGIN: Verifica y entrega el Token


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    print(f"Intento de login con: {email} y {password}")
    # Buscamos al usuario por email y password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401

    # Si todo es correcto, generamos el token usando su ID
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200

# 3. RUTA PRIVADA: Solo accesible con Token válido


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    return jsonify({"msg": "Acceso concedido", "user": user.serialize()}), 200