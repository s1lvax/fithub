#!/bin/bash

# Create uploads folder if it doesn't exist
mkdir -p ./uploads

# Proceed to build and run Docker Compose
docker-compose up --build -d
