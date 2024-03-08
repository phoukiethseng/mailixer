<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('newsletter_status', function (Blueprint $table) {
            $table->unique('name');
        });
        Schema::table('newsletter_content_type', function (Blueprint $table) {
            $table->unique('name');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('newsletter_status', function (Blueprint $table) {
            $table->dropUnique('name');
        });
        Schema::table('newsletter_content_type', function (Blueprint $table) {
            $table->dropUnique('name');
        });
    }
};
