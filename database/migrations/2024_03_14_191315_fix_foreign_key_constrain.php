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
        Schema::table('newsletter_send_results', function (Blueprint $table) {
            $table->dropForeign(['subscriber_id']);
            $table->dropColumn('subscriber_id');
        });
        Schema::table('newsletter_send_results', function (Blueprint $table) {
            $table->foreignId('subscriber_id')->nullable()->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('newsletter_send_results', function (Blueprint $table) {
            $table->dropForeign(['subscriber_id']);
            $table->dropColumn('subscriber_id');
        });
        Schema::table('newsletter_send_results', function (Blueprint $table) {
            $table->foreignId('subscriber_id')->constrained();
        });
    }
};
