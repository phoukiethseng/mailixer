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
        // https://stackoverflow.com/a/54453430
        // Drop foreign constraint first before renaming table
        // And add it back after renaming, so that name of constraint is aligned with table name

        Schema::table('newsletter_send_results', function (Blueprint $table) {
            $table->dropForeign(['newsletter_id']);
            $table->dropForeign(['subscriber_id']);
        });

        Schema::rename('newsletter_send_results', 'email_send_results');

        Schema::table('email_send_results', function (Blueprint $table) {
            $table->foreign('newsletter_id')->references('id')->on('newsletters');
            $table->foreign('subscriber_id')->references('id')->on('subscribers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('email_send_results', function (Blueprint $table) {
            $table->dropForeign(['newsletter_id']);
            $table->dropForeign(['subscriber_id']);
        });

        Schema::rename('email_send_results', 'newsletter_send_results');

        Schema::table('newsletter_send_results', function (Blueprint $table) {
            $table->foreign('newsletter_id')->references('id')->on('newsletters');
            $table->foreign('subscriber_id')->references('id')->on('subscribers');
        });

    }
};
