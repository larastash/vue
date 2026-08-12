#!/usr/bin/env php

<?php

$commands = [
    'composer update --with-all-dependencies',
    'npm update',
];

copy('.env.example', '.env');

foreach ($commands as $command) {
    echo "---------------------------------------------\n";
    echo "💨 Run command: $command\n";
    echo "---------------------------------------------\n";
    system($command);
}

echo "---------------------------------------------\n";
echo "Project updated! 🎉 \n";
echo "---------------------------------------------\n";
