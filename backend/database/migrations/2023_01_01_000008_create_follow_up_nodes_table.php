
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
        Schema::create('follow_up_nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('follow_up_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['email', 'task', 'conditional']);
            $table->text('content');
            $table->integer('delay')->default(0);
            $table->enum('delay_unit', ['minutes', 'hours', 'days'])->default('days');
            $table->json('conditions')->nullable();
            $table->integer('sequence_order')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_up_nodes');
    }
};
