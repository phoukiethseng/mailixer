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
        Schema::create('newsletter_content_type', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->timestamps();
        });
        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('subject')->default('Newsletter');
            $table->bigInteger('content_type_id');
            $table->text('content');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('content_type_id')->references('id')->on('newsletter_content_type');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newsletters');
        Schema::dropIfExists('newsletter_content_type');
    }
};
