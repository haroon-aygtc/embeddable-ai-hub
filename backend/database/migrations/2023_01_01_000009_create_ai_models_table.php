
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAiModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ai_models', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('provider');
            $table->text('description');
            $table->string('api_key')->nullable();
            $table->string('base_url')->nullable();
            $table->string('model_type');
            $table->integer('max_tokens')->nullable();
            $table->float('temperature', 2, 1)->nullable();
            $table->boolean('is_default')->default(false);
            $table->string('status')->default('inactive');
            $table->json('capabilities')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ai_models');
    }
}
