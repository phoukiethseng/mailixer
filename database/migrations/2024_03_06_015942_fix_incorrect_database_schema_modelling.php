<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('newsletters', function (Blueprint $table) {
            $table->dropColumn('message_id');
        });
        Schema::create('newsletter_send_results', function (Blueprint $table) {
            $table->id('id');
            $table->bigInteger('newsletter_id');
            $table->bigInteger('subscriber_id');
            $table->text('message_id')->nullable();
            $table->boolean('is_success');
            $table->timestamps();

            $table->foreign('newsletter_id')->references('id')->on('newsletters');
            $table->foreign('subscriber_id')->references('id')->on('subscribers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('newsletters', function (Blueprint $table) {
            $table->text('message_id')->nullable();
        });
        Schema::dropIfExists('newsletter_send_results');
    }
};
