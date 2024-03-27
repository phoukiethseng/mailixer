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
        Schema::table('subscribers', function (Blueprint $table) {
            $table->timestamp('unsubscribed_at')->nullable()->default(null);
            $table->unique(['unsubscribe_token']);
            $table->dropUnique(['email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscribers', function (Blueprint $table) {
            $table->unique(['email']);
            $table->dropUnique(['unsubscribe_token']);
            $table->dropColumn('unsubscribed_at');
        });
    }
};
