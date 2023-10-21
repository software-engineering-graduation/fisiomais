#!/bin/bash

# Define the Docker image and container name
IMAGE_NAME="fisiomais-mysql"
CONTAINER_NAME="fisiomais-mysql-container"

# Function to build the Docker image
build_image() {
    docker build -t $IMAGE_NAME .
}

# Function to run the Docker container with a volume
run_container() {
    docker run -d --name $CONTAINER_NAME -p 3306:3306 \
        -v mysql_data:/var/lib/mysql \
        $IMAGE_NAME
}

# Function to stop the Docker container
stop_container() {
    docker stop $CONTAINER_NAME
}

# Function to restart the Docker container
restart_container() {
    stop_container
    run_container
}

# Function to remove the Docker container
remove_container() {
    stop_container
    docker rm $CONTAINER_NAME
}

# Function to clean the database (remove container and volume)
clean_database() {
    stop_container

    # Check if the mysql_data_backups directory exists; if not, create it
    if [ ! -d "mysql_data_backups" ]; then
        mkdir mysql_data_backups
    fi

    # Create a timestamp for the backup filename
    timestamp=$(date +"%Y%m%d%H%M%S")

    # Backup the MySQL data
    tar -zcvf "mysql_data_backups/mysql_data_backup_$timestamp.tar.gz" -C mysql_data

    # Remove the container
    docker rm -f $CONTAINER_NAME

    # Remove the associated volume
    docker volume rm mysql_data

    # Clear the mysql_data directory
    rm -rf mysql_data/*

    run_container
}


# Display usage instructions
usage() {
    echo "Usage: $0 [build|run|stop|restart|remove|clean]"
    echo "Build: Build the Docker image"
    echo "Run: Run the Docker container"
    echo "Stop: Stop the Docker container"
    echo "Restart: Restart the Docker container"
    echo "Remove: Remove the Docker container"
    echo "Clean: Clean the database (remove container and volume)"
    exit 1
}

# Main script
case "$1" in
    build) build_image ;;
    run) run_container ;;
    stop) stop_container ;;
    restart) restart_container ;;
    remove) remove_container ;;
    clean) clean_database ;;
    *) usage ;;
esac

exit 0