 #!/usr/bin/env php

<?php

$commands = [
    'composer install',
    'php artisan key:generate',
    'php artisan storage:link',
    'php artisan migrate --force',
    'npm install'
];

copy('.env.example', '.env');

foreach ($commands as $command) {
    echo "💨 Command: $command\n";
    system($command);
}

echo "Have fun! 👋\n";
