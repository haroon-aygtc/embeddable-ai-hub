
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AIModel extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'provider',
        'description',
        'api_key',
        'base_url',
        'model_type',
        'max_tokens',
        'temperature',
        'is_default',
        'status',
        'capabilities',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'capabilities' => 'array',
        'is_default' => 'boolean',
        'max_tokens' => 'integer',
        'temperature' => 'float',
    ];

    /**
     * Get templates associated with this model
     */
    public function promptTemplates()
    {
        return $this->hasMany(PromptTemplate::class, 'ai_model_id');
    }
}
