<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Разрешения
        $permissions = [
            'users.view',
            'users.create',
            'users.update',
            'users.delete',

            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',

            'settings.view',
            'settings.update',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
            ]);
        }

        // Администратор
        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
        ]);

        $adminRole->syncPermissions($permissions);

        // Пользователь
        $userRole = Role::firstOrCreate([
            'name' => 'user',
        ]);

        $userRole->syncPermissions([
            'settings.view',
            'settings.update',
        ]);
    }
}
